import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const KV_KEY = 'last_played_song';

// The cache header string: Caches at the edge for 30 seconds.
const CACHE_HEADERS = { 
  'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=15' 
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
    const { env } = await getCloudflareContext();
    const kv = (env as unknown as { SPOTIFY_CACHE: KVNamespace }).SPOTIFY_CACHE;

    const client_id = process.env.SPOTIFY_CLIENT_ID ?? '';
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET ?? '';
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN ?? '';

    if (!client_id || !client_secret || !refresh_token) {
      return NextResponse.json(
        { error: 'MISSING_ENV_VARIABLES' },
        { status: 500 }
      );
    }

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    // Step 1: Get access token using the refresh token ---
    const tokenRes = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(refresh_token)}`,
      cache: 'no-store',
    });

    if (!tokenRes.ok) {
      return NextResponse.json({ error: 'TOKEN_FETCH_FAILED' }, { status: 502 });
    }

    const tokenData = (await tokenRes.json()) as SpotifyTokenResponse;

    if (!tokenData.access_token) {
      return NextResponse.json({ error: 'NO_ACCESS_TOKEN' }, { status: 502 });
    }

    // Step 2: Fetch now playing  
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: 'no-store', // We don't cache the fetch TO Spotify, we cache the route's response
    });

    if (nowPlayingRes.status === 204) {
      return await getLastPlayedFromKV(kv);
    }

    if (nowPlayingRes.status >= 400) {
      return NextResponse.json({ error: 'NOW_PLAYING_FETCH_FAILED' }, { status: 502 });
    }

    const song = (await nowPlayingRes.json()) as SpotifyNowPlayingResponse;

    if (!song?.item) {
      return await getLastPlayedFromKV(kv);
    }

    // Step 3: Song is playing — write to KV and return
    const cached: CachedSong = {
      title: song.item.name,
      artist: song.item.artists.map((a) => a.name).join(', '),
      songUrl: song.item.external_urls.spotify,
    };

    // Update KV in the background
    await kv.put(KV_KEY, JSON.stringify(cached));

    return NextResponse.json(
      {
        isPlaying: song.is_playing,
        lastPlayed: false,
        ...cached,
      },
      { headers: CACHE_HEADERS } // Applied 30s cache
    );

  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: 'FATAL_EXCEPTION', message: err.message },
      { status: 500 }
    );
  }
}

// Read last played song from KV
async function getLastPlayedFromKV(kv: KVNamespace) {
  const raw = await kv.get(KV_KEY);

  if (!raw) {
    return NextResponse.json(
      { isPlaying: false, lastPlayed: false },
      { headers: CACHE_HEADERS } // Applied 30s cache
    );
  }

  const cached = JSON.parse(raw) as CachedSong;

  return NextResponse.json(
    {
      isPlaying: false,
      lastPlayed: true,
      ...cached,
    },
    { headers: CACHE_HEADERS } // Applied 30s cache
  );
}