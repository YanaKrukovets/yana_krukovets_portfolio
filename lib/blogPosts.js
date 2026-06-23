// Single source of truth for blog post metadata.
// Used by the blog listing page (pages/blog/index.js) and the
// "You May Also Be Interested In" section (components/RelatedPosts.js).
// Add a new entry here whenever a new post is published.
export const BLOG_POSTS = [
  {
    slug: "teaching-ai-to-cheat-reward-hacking",
    title: "Teaching an AI to Cheat (On Purpose): The Problem of Reward Hacking",
    date: "June 23, 2026",
    isoDate: "2026-06-23",
    readTime: "7 min read",
    category: "AI & Security",
    image: "/images/blogs/research.png",
    description:
      "I built a gridworld where an AI agent can fake its own success signal, trained three agents with different reward rules, and built a detector that catches the cheating by watching behavior instead of score.",
  },
  {
    slug: "focus-copilot-architecture",
    title: "Stack, Layer by Layer — What and Why Behind Focus Copilot",
    date: "June 21, 2026",
    isoDate: "2026-06-21",
    readTime: "9 min read",
    category: "Architecture",
    image: "/images/blogs/focus-copilot.png",
    description:
      "A layer-by-layer walkthrough of Focus Copilot, an ADHD/focus assistant app: why server components, no TypeScript, JWT over database sessions, a free-tier Gemini model, three deliberately separate AI agents, and the code conventions that enforce all of it.",
  },
  {
    slug: "drizzle-postgres-vs-supabase",
    title: "Why We Use Drizzle on Top of Postgres Instead of Just Calling Supabase",
    date: "June 20, 2026",
    isoDate: "2026-06-20",
    readTime: "9 min read",
    category: "Backend",
    image: "/images/blogs/drizzle.png",
    description:
      "Why Focus Copilot uses Drizzle ORM with plain Postgres instead of the Supabase client: schema as code, explicit cascades, typed queries without TypeScript, and where Supabase still wins.",
  },
  {
    slug: "claude-code-security-and-privacy",
    title: "Is Claude Code Safe? What It Stores, How Long, and How to Lock It Down",
    date: "June 18, 2026",
    isoDate: "2026-06-18",
    readTime: "10 min read",
    category: "AI & Security",
    image: "/images/blogs/safe.png",
    description:
      "What Claude Code keeps on your machine and on Anthropic's servers, what leaves over the network, how long it's retained, how to delete it, and the settings that make it more private.",
  },
  {
    slug: "how-i-use-ai-on-wordpress-projects",
    title: "How I Use AI on WordPress Projects — Where It Helps and Where It Hallucinates",
    date: "June 18, 2026",
    isoDate: "2026-06-18",
    readTime: "11 min read",
    category: "WordPress",
    image: "/images/blogs/AI-WP.png",
    description:
      "A working developer's take on using AI on real WordPress client builds: the snippets and blocks it speeds up, the hooks it invents, the AI-content SEO trap, and how to prompt it so the code runs.",
  },
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
