# Yana Krukovets Portfolio — Project Context

Personal portfolio website for Yana Krukovets, a Front-End Developer based in Ottawa, Canada. Live at `yanakrukovets.com`.

## Tech Stack

- **Framework**: Next.js 15 — Pages Router (not App Router)
- **Language**: JavaScript (JSX) — TypeScript is in devDependencies but all source files are `.js`
- **Styling**: Hybrid SCSS + Tailwind CSS (both used in parallel — see Styling section)
- **Icons**: `react-icons` (AiFillGithub, AiFillLinkedin) + FontAwesome (`@fortawesome/react-fontawesome`)
- **Contact form**: `@formspree/react` with form ID `mjvllaww`
- **i18n**: Next.js built-in i18n (`en` / `fr`), locale strings in `locales/en.js` and `locales/fr.js`
- **Deployment**: Vercel

## Project Structure

```
components/       Flat directory — all components at top level, no subdirectories
hooks/            useScrollReveal.js, useTypewriter.js — custom React hooks
locales/          en.js and fr.js — plain JS export objects for i18n strings
pages/            _app.js, _document.jsx, index.js, 404.js, 500.js, api/hello.js
public/images/    components/about/ and components/projects/ for all site images
public/           Yana_Krukovets_CV.pdf — resume download
styles/           Global SCSS only — no CSS Modules
  styles.scss     Master entry point (imports Tailwind directives + all partials)
  base/           _fonts.scss, _variables.scss
  components/     _animations.scss, _backToTopButton.scss, _chat.scss,
                  _footer.scss, _header.scss, _home.scss, _layout.scss,
                  _about.scss, _projects.scss, _contact.scss, _stars.scss
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

### Inactive / Legacy (do not use without explicit intent)

- `Header.js` — old nav for a different project (art gallery routes), not wired up
- `NavLangToggle.js` — EN/FR switcher, currently commented out everywhere
- `Trees.js` / `TreeDetails.js` — decorative CSS tree shapes, commented out in HomeBanner

## Adding a Project

Projects are hardcoded arrays in `components/Projects.js`:

- `projects` — personal projects (rendered on site)
- `projectsWork` — work projects (defined but rendering is commented out)

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

All bio/skills/experience content is hardcoded JSX strings in `components/About.js`:
- **Bio** — paragraph starting "My name is Yana Krukovets..."
- **Skills** — comma-separated list in the Skills `<p>` tag
- **Experience** — three `<p>` blocks with `<b>date</b>` + company link
- **Hobbies** — single paragraph

## i18n Notes

French (`fr`) locale content is largely placeholder (identical to English or stub text like "link1"). The language toggle (`NavLangToggle`) is commented out. Do not invest in French translations until the toggle is re-enabled.

## Known Quirks

- `tsconfig.json` exists but the project uses `.js` throughout — do not convert files to TypeScript without explicit instruction
- `axios`, `swiper`, `react-gtm-module`, `react-scripts`, `react-dev-utils` are listed as dependencies but not actively used
- `styles/styles.css` is a compiled SCSS output file — edit `.scss` sources, not this file
- `pages/api/hello.js` is the default Next.js stub — not used by the UI
