# run-tests

Runs the full Playwright test suite against the local dev server (auto-started if not running).

## Usage

```
/run-tests
```

## What it does

1. Starts `next dev` on port 3000 if not already running (Playwright config handles this automatically via `webServer`).
2. Runs `npx playwright test` — 47 tests covering:
   - SEO (title, meta description, og/twitter tags, h1, landmarks)
   - Accessibility (skip link, alt text, aria labels, form labels, hamburger button)
   - Responsiveness — desktop (1440×900), tablet (768×1024), mobile (375×812)
   - Mobile nav open/close and swiper
   - Desktop grid and CTA buttons
   - Content integrity (skills, timeline, CV link, typewriter animation)

## Commands

```bash
npm run test          # headless run, list reporter
npm run test:ui       # interactive Playwright UI
npx playwright test --grep "SEO"          # run only SEO tests
npx playwright test --grep "mobile"       # run only mobile tests
npx playwright test tests/portfolio.spec.js --headed  # watch in browser
```

## Files

- `tests/portfolio.spec.js` — all test specs
- `playwright.config.js` — config (baseURL, webServer, chromium only)
