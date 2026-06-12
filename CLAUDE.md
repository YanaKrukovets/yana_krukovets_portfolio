# Yana Krukovets Portfolio — Project Context

Personal portfolio website for Yana Krukovets, a Full Stack Developer based in Ottawa, Canada. Live at `yanakrukovets.com`.

## Tech Stack

- **Framework**: Next.js 15 — Pages Router (not App Router)
- **Language**: JavaScript (JSX) — all source files are `.js`; no TypeScript
- **Styling**: Hybrid SCSS + Tailwind CSS (both used in parallel — see Styling section)
- **Icons**: `react-icons` (AiFillGithub, AiFillLinkedin) + FontAwesome (`@fortawesome/react-fontawesome`)
- **Contact form**: `@formspree/react` with form ID `mjvllaww`
- **AI chat**: `@google/generative-ai` (Gemini 2.5 Flash) — backend at `pages/api/chat.js`, rate-limited 10 req/IP/min
- **i18n**: Next.js built-in i18n (`en` / `fr`), locale strings in `locales/en.js` and `locales/fr.js`
- **Testing**: Playwright (`@playwright/test`) — config in `playwright.config.js`, tests in `tests/`
- **Deployment**: Vercel

## Project Structure

```
components/       Flat directory — all components at top level, no subdirectories
hooks/            useScrollReveal.js, useTypewriter.js — custom React hooks
lib/              blogPosts.js — shared BLOG_POSTS metadata array (single source of truth for blog posts)
locales/          en.js and fr.js — plain JS export objects for i18n strings
pages/            _app.js, _document.jsx, index.js, 404.js, 500.js, contact.js, projects.js, privacy-policy.js, api/hello.js, api/chat.js
pages/blog/       index.js (blog listing) + one .js file per post (currently 4 posts)
tests/            portfolio.spec.js — Playwright end-to-end tests (SEO, a11y, responsiveness, content)
playwright.config.js  Playwright config — Chromium only; port defaults to 3000, override with PORT env var (e.g. `PORT=3105 npx playwright test`)
public/images/    components/about/ and components/projects/ for all site images; blogs/ for blog post banners
public/           Yana_Krukovets_CV.pdf — resume download
styles/           Global SCSS only — no CSS Modules
  styles.scss     Master entry point (imports Tailwind directives + all partials)
  base/           _fonts.scss, _variables.scss
  components/     _animations.scss, _backToTopButton.scss, _chat.scss,
                  _footer.scss, _header.scss, _home.scss, _layout.scss,
                  _about.scss, _projects.scss, _contact.scss, _stars.scss,
                  _portfolioModal.scss
```

## Styling Rules

**Do not use CSS Modules.** All styles are global, imported once in `_app.js`.

- **Tailwind utility classes** go directly in JSX `className` props
- **Custom/complex styles** (animations, hover glows, media queries) go in the relevant SCSS partial under `styles/components/`
- SCSS variables for colors and breakpoints are in `styles/base/_variables.scss`
- Tailwind custom config (colors, breakpoints, fonts, max-widths) is in `tailwind.config.js`
- Breakpoints in Tailwind config are `max-width` based (mobile-first inverted): `md`, `sm`, `xsm`, etc.

## Components

### Active / In Use

| Component | Role |
|---|---|
| `Layout.js` | Root shell — wraps all pages; handles OG/Twitter `<Head>` meta tags |
| `HomeBanner.js` | Hero section — renders Navbar + welcome text + CTA buttons + animated stars |
| `Navbar.js` | Fixed top nav — links to `/#about`, `/#projects`, `/#contact` |
| `About.js` | Bio section — photo, skills, experience, hobbies, GitHub/LinkedIn links |
| `Projects.js` | Projects grid — two hardcoded arrays: `projects` (personal) and `projectsWork` (professional) |
| `Project.js` | Single project card — props: `href`, `src`, `alt`, `tech`, `text`, `year` |
| `Contact.js` | Contact form via Formspree |
| `Footer.js` | Simple footer — copyright line |
| `BackToTopButton.js` | Fixed scroll-to-top button, appears after 300px scroll |
| `ChatWidget.js` | AI chat assistant — floating button, opens chat panel; rendered in `_app.js` on homepage only (`router.pathname === "/"`) |
| `PortfolioModal.js` | Info modal with tabs (Tech Stack, Architecture, Claude Setup) — explains how the portfolio site was built; opened from within ChatWidget; uses ProjectModal |
| `ProjectModal.js` | Reusable modal shell — props: `title`, `tabs` (array of `{ label, content }`), `onClose`; handles Escape key, scroll lock, tab switching |
| `RelatedPosts.js` | "You May Also Be Interested In" card grid at the bottom of each blog post — prop: `currentSlug`; reads `lib/blogPosts.js`, filters out the current post, and picks 2 at random client-side (shuffle happens in `useEffect` to avoid SSR hydration mismatch) |
| `BlogCta.js` | Centered CTA card in each blog post footer ("Need a developer for your next project?") — outlined buttons to `/projects`, `/#about`, `/contact` |

### Inactive / Legacy (do not use without explicit intent)

- `Header.js` — old nav for a different project (art gallery routes), not wired up
- `NavLangToggle.js` — EN/FR switcher, currently commented out everywhere
- `Trees.js` / `TreeDetails.js` — decorative CSS tree shapes, commented out in HomeBanner

## Adding a Project

Projects are hardcoded arrays in `components/Projects.js`:

- `projects` — personal projects (rendered on site)
- `projectsWork` — work projects (rendered on site, below personal projects)

Each entry shape:
```js
{
  href: "https://...",
  src: "/images/components/projects/filename.jpg",
  alt: "Description for accessibility",
  text: "Personal Project" | "Elite Digital Project" | etc.,
  tech: "Next.js, Tailwind CSS, Sass",
  year: "2024",
}
```

Place project screenshots in `public/images/components/projects/`.

## Updating Content

All content is in `components/About.js`. Structure:
- **Bio** — JSX paragraphs in the bio block (starts "My name is Yana Krukovets...")
- **Skills** — `SKILLS` array at the top of the file; each entry is `{ icon, label, color }` rendered as a branded icon grid
- **Experience** — `EXPERIENCE` array at the top of the file; each entry is `{ period, role, company, href, location }` rendered as a vertical timeline; currently 4 entries
- **Hobbies** — JSX paragraph in the bio block

## i18n Notes

French (`fr`) locale content is largely placeholder (identical to English or stub text like "link1"). The language toggle (`NavLangToggle`) is commented out. Do not invest in French translations until the toggle is re-enabled.

## Blog

Blog posts live in `pages/blog/`. Each post is its own `.js` file (Pages Router — no dynamic routes yet).

When writing a new post, use the `new-blog-post` skill (`.claude/skills/new-blog-post/SKILL.md`) — it enforces the full checklist below plus accessibility requirements, a mandatory FAQ section with matching `FAQPage` schema, and a `write-like-a-human` final pass on the prose.

**Post metadata** lives in the shared `BLOG_POSTS` array in `lib/blogPosts.js` — used by both the blog index (`pages/blog/index.js`) and the `RelatedPosts` component. Add a new entry there whenever a new post is published:
```js
{
  slug: "post-slug",               // matches the filename (without .js)
  title: "Post title",
  date: "Month DD, YYYY",
  isoDate: "YYYY-MM-DD",           // machine-readable date for <time dateTime>
  readTime: "X min read",
  category: "Category label",
  image: "/images/blogs/filename.png",
  description: "One-sentence teaser shown on the listing page.",
}
```

**Each post page** should include:
- `BlogPosting` JSON-LD (structured data for Google)
- `FAQPage` JSON-LD if the post has clear Q&A sections (helps rich snippets)
- `og:image`, `og:title`, `og:description`, `og:url` with `key` props to override Layout defaults
- Twitter card overrides: `twitter:title`, `twitter:description`, `twitter:image`, `twitter:url` with `key` props
- `<BlogCta />` in the article footer — CTA card linking to `/projects`, `/#about`, and `/contact`
- `<RelatedPosts currentSlug="post-slug" />` after the article footer (inside `blog-article__inner`)
- Inline contextual links to other posts where topics naturally overlap

**Sitemap** (`public/sitemap.xml`) — manually maintained. Add `/blog` and each new post URL when publishing. Set `changefreq: yearly` and `priority: 0.7` for posts.

**Images** — place blog banners in `public/images/blogs/`. Recommended size: 760×400px (used in OG tags and article banner).

## Known Quirks

- `swiper` is actively used — mobile carousel in `Projects.js` (Swiper + SwiperSlide + Pagination/Navigation/A11y modules)
- `styles/styles.css` is a compiled SCSS output file — edit `.scss` sources, not this file
- `styles/styles.scss` uses Dart Sass `@use` (not legacy `@import`); `_variables.scss` is not imported at the root — component partials that need variables must `@use` them directly
- `pages/api/hello.js` is the default Next.js stub — not used by the UI; `pages/api/chat.js` is the real active route (Gemini chat backend)
