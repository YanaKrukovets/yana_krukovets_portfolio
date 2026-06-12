---
name: new-blog-post
description: Create a new blog post for the portfolio — page file, metadata entry, sitemap, SEO schema, FAQ, accessibility, and a write-like-a-human final pass. Trigger when the user asks to write, draft, add, or publish a blog post.
---

# New Blog Post

Creates a complete, publish-ready blog post. Follow the steps in order and do not skip any — every step below has been forgotten at least once when done from memory.

**Reference post:** `pages/blog/what-i-learned-building-my-first-game.js` is the canonical structure. Copy its skeleton (Head block, JSON-LD constants, article markup, FAQ section, footer) rather than writing from scratch.

## Step 1: Slug and metadata

Pick a kebab-case slug. It must match in all four places: the filename, the `BLOG_POSTS` entry, the sitemap URL, and the `<RelatedPosts currentSlug>` prop.

Add the post to `lib/blogPosts.js` (`BLOG_POSTS` array) using the entry shape documented in CLAUDE.md. The banner image goes in `public/images/blogs/` (~760×400px, or match the actual image dimensions in `og:image:width/height` and the `<Image>` props).

## Step 2: Page file

Create `pages/blog/<slug>.js` from the reference post. Required pieces:

- `BlogPosting` JSON-LD constant (headline, description, dates, image, url, author/publisher = Yana Krukovets).
- `FAQPage` JSON-LD constant — **required for every post**, see Step 4.
- `<Head>`: title with `| Yana Krukovets` suffix, meta description, full `og:*` set and `twitter:*` set, all with `key` props so they override Layout defaults.
- Body wrapped in `content-wrapper` → `blog-article` → `blog-article__inner`, with back-link, header meta, banner image, h1, intro, body sections.
- Footer: `<BlogCta />`, bottom back-link, then `<RelatedPosts currentSlug="<slug>" />` inside `blog-article__inner`.
- Inline `<Link>` cross-references to other posts where topics genuinely overlap (check `lib/blogPosts.js` for candidates). Don't force links that don't fit.

## Step 3: Accessibility (required, non-negotiable)

- `<article className="blog-article" aria-labelledby="blog-post-title">` with exactly one `<h1 id="blog-post-title">`.
- Logical heading order: one h1, sections use h2, subsections h3 — never skip levels.
- Decorative separators (the `·` dots in the meta line) get `aria-hidden="true"`.
- `<time dateTime="YYYY-MM-DD">` for the publish date.
- Every image has meaningful `alt` text describing content, not "blog banner".
- External links: `target="_blank" rel="noopener noreferrer"`, and link text that makes sense out of context (no "click here").
- FAQ uses native `<details>`/`<summary>` (keyboard-accessible by default) with the `blog-article__faq*` classes.
- Code identifiers in prose go in `<code>` tags.
- Escape apostrophes/quotes in JSX (`&apos;`, `&ldquo;` etc.) — the lint build fails otherwise.

## Step 4: FAQ section + FAQ schema (required)

Every post ends its body with a `blog-article__faq` section: an h2 "Frequently Asked Questions" and 3–4 `<details>` Q&As drawn from real questions the post answers.

The `FAQPage` JSON-LD must mirror the visible FAQ **exactly** — same questions, same answer text (minus JSX markup). Google flags mismatches between schema and visible content. Both `<script type="application/ld+json">` tags go in `<Head>` via `dangerouslySetInnerHTML`.

## Step 5: Sitemap

Add the post URL to `public/sitemap.xml` (manually maintained): `changefreq` `yearly`, `priority` `0.7`, `lastmod` = publish date.

## Step 6: Final passes

1. **Invoke the `write-like-a-human` skill on the article prose.** This is mandatory, not optional — run it on the body text, intro, and FAQ answers. It does not apply to JSON-LD, meta descriptions, or alt text.
2. Verify the checklist: slug matches in all four places; both JSON-LD blocks present and valid JSON; FAQ schema matches visible FAQ; sitemap updated; `RelatedPosts` and `BlogCta` present; banner image file exists.
3. Run the Playwright tests if they cover blog pages (`tests/portfolio.spec.js`), or at minimum confirm the page builds: `npx next build` or load it on the dev server.
