---
description: Generate a commit message for staged changes
---

Run this bash command and show me its output:
`git diff --cached --stat && echo "---" && git diff --cached --name-only`

Based on the staged files and diff above, generate a commit message in this format:

```
type(scope): short title

1-2 sentence description of what changed and why.
```

Rules for `type`:
- `feat` — new file added
- `update` — existing file modified
- `remove` — file deleted
- `fix` — bug fix

Rules for `scope` — use the most specific one that applies:
- `projects` — components/Projects.js
- `about` — components/About.js
- `contact` — components/Contact.js
- `navbar` — components/Navbar.js
- `banner` — components/HomeBanner.js
- `layout` — components/Layout.js
- `footer` — components/Footer.js
- `styles` — any file in styles/
- `assets` — any file in public/images/
- `i18n` — any file in locales/
- `config` — next.config.js, tailwind.config.js, package.json, etc.
- `docs` — AGENTS.md, CLAUDE.md, README.md
- `components` — multiple components changed at once

Rules for title:
- Max 50 characters
- Lowercase
- No period at the end
- Be specific: "add art-shop project" not just "update projects list"

Rules for description:
- 1-2 sentences max
- Explain what changed and why, not just which files
- Example: "Rewrote Navbar with scroll-aware styles and mobile menu. Added useScrollReveal hook for section animations."

Output only the commit message (title + blank line + description), ready to paste into Fork. No extra explanation.
