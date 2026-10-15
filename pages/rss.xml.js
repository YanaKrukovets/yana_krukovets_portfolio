import { BLOG_POSTS } from "../lib/blogPosts";
import { SITE_URL } from "../lib/site";

// RSS 2.0 feed for the blog, generated from lib/blogPosts.js so it never drifts
// from the listing page. Served at /rss.xml — the page component renders nothing;
// getServerSideProps writes the XML straight to the response.

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// isoDate is date-only; pin it to midday UTC so the day doesn't shift across timezones
const toRssDate = (isoDate) => new Date(`${isoDate}T12:00:00Z`).toUTCString();

function buildFeed() {
  const items = BLOG_POSTS.map((post) => {
    const url = `${SITE_URL}/blog/${post.slug}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRssDate(post.isoDate)}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.description)}</description>
    </item>`;
  }).join("\n");

  const lastBuildDate = BLOG_POSTS.length ? toRssDate(BLOG_POSTS[0].isoDate) : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yana Krukovets — Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes from real projects on web development, WordPress, performance, SEO, and AI — by Yana Krukovets, Full Stack Developer in Ottawa, Canada.</description>
    <language>en-ca</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildFeed());
  res.end();
  return { props: {} };
}

export default function RssFeed() {
  return null;
}
