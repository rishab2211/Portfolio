import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const KV_KEY = "last_played_song";

// The cache header string: Caches at the edge for 30 seconds.
const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15",
};

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

interface SpotifyTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface SpotifyNowPlayingResponse {
  is_playing: boolean;
  item: {
    name: string;
    artists: { name: string }[];
    external_urls: { spotify: string };
  } | null;
}

interface CachedSong {
  title: string;
  artist: string;
  songUrl: string;
}

export async function GET() {
  try {
    let kv: KVNamespace | undefined;
    let client_id = process.env.SPOTIFY_CLIENT_ID ?? "";
    let client_secret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
    let refresh_token = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

    try {
      const context = await getCloudflareContext();
      if (context?.env) {
        const envObj = context.env as Record<string, unknown>;
        if (envObj.SPOTIFY_CACHE) {
          kv = envObj.SPOTIFY_CACHE as KVNamespace;
        }
        client_id = (envObj.SPOTIFY_CLIENT_ID as string) || client_id;
        client_secret = (envObj.SPOTIFY_CLIENT_SECRET as string) || client_secret;
        refresh_token = (envObj.SPOTIFY_REFRESH_TOKEN as string) || refresh_token;
      }
    } catch {
      // Local dev outside Cloudflare worker
    }

    if (!client_id || !client_secret || !refresh_token) {
      return NextResponse.json(
        { isPlaying: false, lastPlayed: false, error: "MISSING_ENV_VARIABLES" },
        { status: 200, headers: NO_CACHE_HEADERS }
      );
    }

    // Step 1: Get access token using the refresh token (Edge-compatible btoa)
    const basic = btoa(`${client_id}:${client_secret}`);

    const tokenRes = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(refresh_token)}`,
      cache: "no-store",
    });

    if (!tokenRes.ok) {
      return await getLastPlayedFallback(kv);
    }

    const tokenData = (await tokenRes.json()) as SpotifyTokenResponse;

    if (!tokenData.access_token) {
      return await getLastPlayedFallback(kv);
    }

    // Step 2: Fetch now playing
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: "no-store",
    });

    if (nowPlayingRes.status === 204 || nowPlayingRes.status >= 400) {
      return await getLastPlayedFallback(kv);
    }

    const song = (await nowPlayingRes.json()) as SpotifyNowPlayingResponse;

    if (!song?.item || !song.is_playing) {
      return await getLastPlayedFallback(kv);
    }

    // Step 3: Song is currently playing
    const cached: CachedSong = {
      title: song.item.name,
      artist: song.item.artists.map((a) => a.name).join(", "),
      songUrl: song.item.external_urls.spotify,
    };

    // Update KV conditionally to protect write quotas
    if (kv) {
      try {
        const existing = await kv.get(KV_KEY);
        const parsed = existing ? (JSON.parse(existing) as CachedSong) : null;
        if (!parsed || parsed.title !== cached.title) {
          await kv.put(KV_KEY, JSON.stringify(cached));
        }
      } catch (err) {
        console.warn("KV write skipped:", err);
      }
    }

    return NextResponse.json(
      {
        isPlaying: true,
        lastPlayed: false,
        ...cached,
      },
      { headers: CACHE_HEADERS }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Spotify route exception:", err);
    return NextResponse.json(
      { isPlaying: false, lastPlayed: false, message: err.message },
      { status: 200, headers: NO_CACHE_HEADERS }
    );
  }
}

// Read last played song from KV or fallback
async function getLastPlayedFallback(kv?: KVNamespace) {
  if (kv) {
    try {
      const raw = await kv.get(KV_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as CachedSong;
        return NextResponse.json(
          {
            isPlaying: false,
            lastPlayed: true,
            ...cached,
          },
          { headers: CACHE_HEADERS }
        );
      }
    } catch (err) {
      console.warn("KV get error:", err);
    }
  }

  return NextResponse.json(
    { isPlaying: false, lastPlayed: false },
    { headers: CACHE_HEADERS }
  );
}