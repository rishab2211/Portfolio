import { NextResponse } from "next/server";

export type BlogPost = {
  id: string;
  title: string;
  brief: string;
  slug: string;
  url: string;
  readTimeInMinutes: number;
  publishedAt: string;
  coverImage?: string | null;
  tags: string[];
};

const SUBSTACK_URL = "https://rishab2211.substack.com";
const SUBSTACK_FEED_URL = "https://rishab2211.substack.com/feed";

// Clean HTML tags and decode HTML entities from RSS text
function cleanHtml(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Parse Substack RSS 2.0 XML
function parseSubstackRss(xmlText: string): BlogPost[] {
  const posts: BlogPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];

    // Extract Title
    const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/i);
    const rawTitle = titleMatch ? titleMatch[1] : "Untitled Post";
    const title = cleanHtml(rawTitle);

    // Extract Link / URL
    const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/i);
    const url = linkMatch ? cleanHtml(linkMatch[1]) : SUBSTACK_URL;

    // Extract Slug from URL
    const slugMatch = url.match(/\/p\/([^/?#]+)/);
    const slug = slugMatch ? slugMatch[1] : title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // Extract PubDate
    const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);
    let publishedAt = new Date().toISOString();
    if (pubDateMatch) {
      try {
        const parsed = new Date(pubDateMatch[1].trim());
        if (!isNaN(parsed.getTime())) {
          publishedAt = parsed.toISOString();
        }
      } catch {
        // fallback
      }
    }

    // Extract rich content from <content:encoded> or <description>
    const contentMatch = itemContent.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/i);
    const descMatch = itemContent.match(/<description>([\s\S]*?)<\/description>/i);
    const fullText = cleanHtml(contentMatch ? contentMatch[1] : descMatch ? descMatch[1] : "");

    // Generate clean excerpt
    const brief = fullText.length > 220 ? fullText.slice(0, 220) + "..." : fullText;

    // Extract Cover Image from enclosure or content
    const enclosureMatch = itemContent.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
    let coverImage = enclosureMatch ? enclosureMatch[1] : null;

    if (!coverImage && contentMatch) {
      const imgMatch = contentMatch[1].match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) coverImage = imgMatch[1];
    }

    // Calculate actual reading time
    const words = fullText.split(/\s+/).filter(Boolean).length;
    const readTimeInMinutes = Math.max(3, Math.ceil(words / 200));

    // Tags extraction
    const tagMatches = itemContent.match(/<category>([\s\S]*?)<\/category>/gi) || [];
    const tags = tagMatches
      .map((t) => cleanHtml(t.replace(/<\/?category>/gi, "")))
      .filter(Boolean)
      .slice(0, 3);

    if (tags.length === 0) {
      if (/javascript|js|browser|web/i.test(title)) {
        tags.push("JavaScript", "Web Architecture", "Engines");
      } else if (/java|concurrency|socket/i.test(title)) {
        tags.push("Java", "Concurrency", "Systems");
      } else if (/ai|scraping|gemini/i.test(title)) {
        tags.push("AI Systems", "Automation", "Puppeteer");
      } else {
        tags.push("Engineering", "Software Architecture");
      }
    }

    posts.push({
      id: slug || `substack-${posts.length}`,
      title,
      brief: brief || "Click to read the complete technical essay on Substack.",
      slug,
      url,
      readTimeInMinutes,
      publishedAt,
      coverImage,
      tags,
    });
  }

  return posts;
}

export async function GET() {
  try {
    const res = await fetch(SUBSTACK_FEED_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json([], {
        headers: { "Cache-Control": "no-store, max-age=0" },
      });
    }

    const xmlText = await res.text();
    const livePosts = parseSubstackRss(xmlText);

    return NextResponse.json(livePosts, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=120" },
    });
  } catch (error) {
    console.warn("Substack RSS parse error:", error);
    return NextResponse.json([], {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  }
}
