// Edge-compatible Cloudinary Service Utility
// Works with Cloudflare Workers (OpenNext) and Node.js runtimes

export interface MemoryPhoto {
  id: string | number;
  folder: "IEEE" | "Hackathons" | "Trips" | "All";
  src: string;
  caption: string;
  rotation: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

// Curated high-res fallback photos (with developer, hackathon, and community aesthetics)
// Ensures the gallery looks stunning immediately even before custom Cloudinary images are uploaded
export const FALLBACK_MEMORIES: MemoryPhoto[] = [
  {
    id: "ieee-elevion",
    folder: "IEEE",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    caption: "Elevion'25 • 500+ Attendees",
    rotation: -6,
    x: -120,
    y: 20,
  },
  {
    id: "ieee-core",
    folder: "IEEE",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    caption: "Exec Board & Core Leads",
    rotation: 5,
    x: 140,
    y: 30,
  },
  {
    id: "hackathon-agentic",
    folder: "Hackathons",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    caption: "Agentic AI Hackathon",
    rotation: -3,
    x: -50,
    y: -20,
  },
  {
    id: "hackathon-3am",
    folder: "Hackathons",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    caption: "3 AM Deployments",
    rotation: 8,
    x: 90,
    y: 40,
  },
  {
    id: "trip-dssywlc",
    folder: "Trips",
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    caption: "IEEE Congress / DSSYWLC",
    rotation: -8,
    x: -100,
    y: -30,
  },
  {
    id: "trip-outbound",
    folder: "Trips",
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    caption: "Executive Retreat",
    rotation: 4,
    x: 80,
    y: 60,
  },
];

interface CloudinaryResource {
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder?: string;
  tags?: string[];
  context?: {
    custom?: {
      caption?: string;
      folder?: string;
      category?: string;
    };
  };
  secure_url?: string;
}

/**
 * Builds an optimized Cloudinary delivery URL
 */
export function buildCloudinaryUrl(
  cloudName: string,
  publicId: string,
  transformations: string = "f_auto,q_auto,w_800"
): string {
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
}

/**
 * Fetches memories dynamically from Cloudinary REST Search/Admin API.
 * Uses native Web API `fetch` + `btoa` so it's 100% compatible with Cloudflare Workers.
 */
export async function getCloudinaryMemories(options?: {
  cloudName?: string;
  apiKey?: string;
  apiSecret?: string;
  folder?: string;
}): Promise<MemoryPhoto[]> {
  const cloudName =
    options?.cloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = options?.apiKey || process.env.CLOUDINARY_API_KEY;
  const apiSecret = options?.apiSecret || process.env.CLOUDINARY_API_SECRET;
  const targetFolder = options?.folder || "portfolio/memories";

  if (!cloudName || !apiKey || !apiSecret) {
    return FALLBACK_MEMORIES;
  }

  try {
    const basicAuth = btoa(`${apiKey}:${apiSecret}`);

    // Fetch resources from Cloudinary Search API
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression: `folder:${targetFolder}* OR tags:portfolio OR tags:memories`,
          max_results: 30,
          sort_by: [{ created_at: "desc" }],
          with_field: ["context", "tags"],
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.warn(`Cloudinary search failed (${response.status}), falling back.`);
      return FALLBACK_MEMORIES;
    }

    const data = (await response.json()) as { resources?: CloudinaryResource[] };

    if (!data.resources || data.resources.length === 0) {
      return FALLBACK_MEMORIES;
    }

    const ROTATIONS = [-6, 5, -3, 8, -8, 4, -5, 7];
    const OFFSETS = [
      { x: -120, y: 20 },
      { x: 140, y: 30 },
      { x: -50, y: -20 },
      { x: 90, y: 40 },
      { x: -100, y: -30 },
      { x: 80, y: 60 },
      { x: -60, y: 50 },
      { x: 110, y: -20 },
    ];

    return data.resources.map((res, index) => {
      const folderTag =
        res.context?.custom?.category ||
        res.context?.custom?.folder ||
        res.tags?.find((t) => ["IEEE", "Hackathons", "Trips"].includes(t)) ||
        (res.public_id.toLowerCase().includes("ieee")
          ? "IEEE"
          : res.public_id.toLowerCase().includes("hackathon")
          ? "Hackathons"
          : res.public_id.toLowerCase().includes("trip")
          ? "Trips"
          : "IEEE");

      const category = (["IEEE", "Hackathons", "Trips"].includes(folderTag)
        ? folderTag
        : "IEEE") as "IEEE" | "Hackathons" | "Trips";

      const caption =
        res.context?.custom?.caption ||
        res.public_id.split("/").pop()?.replace(/[-_]/g, " ") ||
        "Memory";

      const rot = ROTATIONS[index % ROTATIONS.length] ?? -5;
      const offset = OFFSETS[index % OFFSETS.length] ?? { x: 0, y: 0 };

      return {
        id: res.public_id,
        folder: category,
        src: buildCloudinaryUrl(cloudName, res.public_id),
        caption: caption.charAt(0).toUpperCase() + caption.slice(1),
        rotation: rot,
        x: offset.x,
        y: offset.y,
        width: res.width,
        height: res.height,
      };
    });
  } catch (error) {
    console.error("Error fetching from Cloudinary:", error);
    return FALLBACK_MEMORIES;
  }
}
