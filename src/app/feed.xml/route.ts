import { SITE, SITE_URL, abs } from "@/data/site";
import { POSTS } from "@/data/posts";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = POSTS.map(
    (p) => `<item>
<title>${esc(p.title)}</title>
<link>${abs(`/blog/${p.slug}/`)}</link>
<guid isPermaLink="true">${abs(`/blog/${p.slug}/`)}</guid>
<pubDate>${new Date(p.date).toUTCString()}</pubDate>
<category>${esc(p.cat)}</category>
<description>${esc(p.tldr)}</description>
</item>`
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(SITE.name)} Blog</title>
<link>${SITE_URL}/blog/</link>
<description>${esc(SITE.description)}</description>
<language>en-IN</language>
<atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
