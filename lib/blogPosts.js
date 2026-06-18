// Single source of truth for blog post metadata.
// Used by the blog listing page (pages/blog/index.js) and the
// "You May Also Be Interested In" section (components/RelatedPosts.js).
// Add a new entry here whenever a new post is published.
export const BLOG_POSTS = [
  {
    slug: "wordpress-seo-yoast",
    title: "SEO for WordPress with Yoast — What It Fixed on a Client Build, and What It Couldn't",
    date: "June 17, 2026",
    isoDate: "2026-06-17",
    readTime: "8 min read",
    category: "WordPress",
    image: "/images/blogs/wordpress-seo.png",
    description:
      "Setting up Yoast SEO on a real client WordPress site: title and meta templates, XML sitemaps, schema, the green-light analysis, and the SEO work Yoast can't do for you.",
  },
  {
    slug: "google-search-console-guide",
    title: "Google Search Console Explained — Indexing Reports, URL Inspection, and Why Your Pages Aren't Showing Up",
    date: "June 15, 2026",
    isoDate: "2026-06-15",
    readTime: "7 min read",
    category: "SEO",
    image: "/images/blogs/seo2.png",
    description:
      "A practical guide to Google Search Console: what the indexing report means, how to read common 'not indexed' reasons like 'Page with redirect' and 'Discovered — currently not indexed', and how to request indexing faster.",
  },
  {
    slug: "seo-for-nextjs-portfolio",
    title: "SEO for a Next.js Portfolio — Meta Tags, Open Graph, and JSON-LD That Actually Work",
    date: "June 10, 2026",
    isoDate: "2026-06-10",
    readTime: "9 min read",
    category: "Next.js",
    image: "/images/blogs/SEO.png",
    description:
      "How I added SEO to yanakrukovets.com: meta tags, Open Graph, Twitter cards, JSON-LD structured data, sitemap, and the Next.js key prop trick that makes page-level overrides work correctly.",
  },
  {
    slug: "what-i-learned-building-my-first-game",
    title: "What I Learned Building My First Game (Without a Game Engine)",
    date: "June 9, 2026",
    isoDate: "2026-06-09",
    readTime: "8 min read",
    category: "Game Dev",
    image: "/images/blogs/alifallx.jpg",
    description:
      "A devlog about AlifallX, a space arcade game built with plain HTML5 canvas inside Next.js — game loops vs React, difficulty math, mobile controls, and how AI pair programming changed the second half of the project.",
  },
  {
    slug: "improve-nextjs-react-performance",
    title: "How to Improve Performance in Next.js and React Apps — defer, preload, and prefetch Done Right",
    date: "June 5, 2026",
    isoDate: "2026-06-05",
    readTime: "9 min read",
    category: "Next.js",
    image: "/images/blogs/performance2.png",
    description:
      "Script loading strategies, resource hints, image priorities, and code splitting — the techniques that actually make Next.js and React apps faster, and the order to apply them in.",
  },
  {
    slug: "improve-wordpress-performance",
    title: "How to Improve WordPress Performance — Plugins That Work, and Why GTM Tanks Your Score",
    date: "June 1, 2026",
    isoDate: "2026-06-01",
    readTime: "7 min read",
    category: "WordPress",
    image: "/images/blogs/performance.png",
    description:
      "Which caching and optimization plugins actually make WordPress faster — and why Google Tag Manager is quietly destroying your PageSpeed score on every page.",
  },
  {
    slug: "why-avoid-page-builders",
    title: "Why I avoid using Page Builders — And What I Use Instead",
    date: "May 25, 2026",
    isoDate: "2026-05-25",
    readTime: "8 min read",
    category: "WordPress",
    image: "/images/blogs/wordpress-banner.png",
    description:
      "Elementor, WPBakery, Divi — they promise design freedom but deliver slow sites, locked-in content, and painful handoffs. Here's what I learned working on real WordPress projects, and why Gutenberg changed my mind.",
  },
];
