# Yana Krukovets Portfolio — Project Context

Personal portfolio website for Yana Krukovets, a Full Stack Developer based in Ottawa, Canada. Live at `yanakrukovets.com`.

## Tech Stack

- **Framework**: Next.js 15 — Pages Router (not App Router)
- **Language**: JavaScript (JSX) — all source files are `.js`; no TypeScript
- **Styling**: Hybrid SCSS + Tailwind CSS (both used in parallel — see Styling section)
- **Icons**: `react-icons` (AiFillGithub, AiFillLinkedin) + FontAwesome (`@fortawesome/react-fontawesome`)
- **Contact form**: `@formspree/react` with form ID `mjvllaww`
- **AI chat**: `@google/generative-ai` (Gemini 2.5 Flash) — backend at `pages/api/chat.js`, rate-limited 10 req/IP/min
- **Analytics**: Custom, cookieless, first-party analytics stored in **Supabase** (`@supabase/supabase-js`) with **Gemini**-generated improvement suggestions. See the Analytics section below.
- **i18n**: Next.js built-in i18n (`en` / `fr`), locale strings in `locales/en.js` and `locales/fr.js`
- **Testing**: Playwright (`@playwright/test`) — config in `playwright.config.js`, tests in `tests/`
- **Deployment**: Vercel

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Tests: `npm test` (Playwright; use `PORT=3105 npm test` if port 3000 is busy)
- Tests (UI mode): `npm run test:ui`

## Project Structure

```
components/       Flat directory — all components at top level, no subdirectories
hooks/            useScrollReveal.js, useTypewriter.js — custom React hooks
lib/              blogPosts.js — shared BLOG_POSTS metadata array (single source of truth for blog posts)
locales/          en.js and fr.js — plain JS export objects for i18n strings
pages/            _app.js, _document.jsx, index.js, 404.js, 500.js, contact.js, projects.js, privacy-policy.js, api/hello.js, api/chat.js, api/track.js, api/insights.js, api/admin-login.js, api/admin-stats.js
pages/admin/      analytics.js — password-gated analytics dashboard (noindex)
pages/blog/       index.js (blog listing) + one .js file per post (currently 5 posts)
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

Use the `add-project` skill. (Projects are hardcoded arrays — `projects` and `projectsWork` — in `components/Projects.js`; screenshots go in `public/images/components/projects/`.)

## Updating Content

Use the `update-content` skill. (Bio, `SKILLS`, `EXPERIENCE`, and hobbies all live in `components/About.js`.)

## i18n Notes

French (`fr`) locale content is largely placeholder (identical to English or stub text like "link1"). The language toggle (`NavLangToggle`) is commented out. Do not invest in French translations until the toggle is re-enabled.

## Blog

Use the `new-blog-post` skill — it enforces the full checklist (metadata in `lib/blogPosts.js`, SEO/FAQ schema, accessibility, sitemap update, and a `write-like-a-human` pass). Posts live in `pages/blog/`, one `.js` file each (Pages Router — no dynamic routes); banners go in `public/images/blogs/` (760×400px).

## Analytics

Custom, Hotjar-style analytics — cookieless and anonymous (opt-out model: tracking runs by default until a visitor clicks "Decline" on the consent banner; also disabled by Do-Not-Track).

**Data flow:** browser → `/api/track` → Supabase. Dashboard reads aggregates → `/api/insights` → Gemini → suggestions. The Supabase **service-role key is server-only**; the browser never touches Supabase directly.

| Piece | File |
|---|---|
| Client tracker (cookieless, batched, sessionStorage id) | `lib/analytics.js` |
| Headless global tracker (pageviews, clicks/heatmap coords, scroll depth, time-on-page) | `components/AnalyticsTracker.js` |
| Opt-out consent banner | `components/ConsentBanner.js` (+ `styles/components/_consentBanner.scss`) |
| Event ingestion (validates + inserts; 204 silently if unconfigured) | `pages/api/track.js` |
| Server Supabase client (lazy, null if env missing) | `lib/supabaseAdmin.js` |
| Aggregation helpers (raw rows never leave the server) | `lib/analyticsAggregate.js` |
| Password auth (signed httpOnly cookie) | `lib/adminAuth.js`, `pages/api/admin-login.js` |
| Dashboard data + AI suggestions | `pages/api/admin-stats.js`, `pages/api/insights.js` |
| Dashboard UI (password-gated, `noindex`) | `pages/admin/analytics.js` |

`/admin/*` pages render standalone in `_app.js` (no site chrome, chat, or self-tracking).

**Setup:** run `supabase/schema.sql` in the Supabase SQL editor, then set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ANALYTICS_ADMIN_PASSWORD`, `ANALYTICS_SESSION_SECRET` (see `.env.example`). View at `/admin/analytics`.

## Known Quirks

- `swiper` is actively used — mobile carousel in `Projects.js` (Swiper + SwiperSlide + Pagination/Navigation/A11y modules)
- `styles/styles.css` is a compiled SCSS output file — edit `.scss` sources, not this file
- `styles/styles.scss` uses Dart Sass `@use` (not legacy `@import`); `_variables.scss` is not imported at the root — component partials that need variables must `@use` them directly
- `pages/api/hello.js` is the default Next.js stub — not used by the UI; `pages/api/chat.js` is the real active route (Gemini chat backend)
