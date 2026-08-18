import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getCloudinaryMemories, FALLBACK_MEMORIES } from "@/lib/cloudinary";

// Cache at the edge for 60 seconds, allow stale-while-revalidate for 30s
const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
};

export async function GET(request: Request) {
  try {
    let cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    let apiKey = process.env.CLOUDINARY_API_KEY;
    let apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Check Cloudflare Context if available
    try {
      const { env } = await getCloudflareContext();
      if (env) {
        const cfEnv = env as Record<string, string | undefined>;
        cloudName = cfEnv.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || cloudName;
        apiKey = cfEnv.CLOUDINARY_API_KEY || apiKey;
        apiSecret = cfEnv.CLOUDINARY_API_SECRET || apiSecret;
      }
    } catch {
      // Running in standard local node environment
    }

    const { searchParams } = new URL(request.url);
    const requestedFolder = searchParams.get("folder") || "All";

    const allPhotos = await getCloudinaryMemories({
      cloudName,
      apiKey,
      apiSecret,
    });

    const filtered =
      requestedFolder === "All" || !requestedFolder
        ? allPhotos
        : allPhotos.filter(
            (p) => p.folder.toLowerCase() === requestedFolder.toLowerCase()
          );

    return NextResponse.json(filtered, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error("Failed to fetch memories route:", error);
    return NextResponse.json(FALLBACK_MEMORIES, {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
