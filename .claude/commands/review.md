---
description: Review only the files changed in this branch vs main
---

Run this command and use the output as the review scope:
`git diff main...HEAD --name-only 2>/dev/null || git diff HEAD~1 --name-only`

Then run:
`git diff main...HEAD 2>/dev/null || git diff HEAD~1`

Review **only the changed files** listed above. Do not review the full project.

For each changed file, check:
- **Bugs** — wrong conditions, null/undefined deref, missing await, swallowed errors
- **Security** — unvalidated input, exposed secrets, injection risks
- **Logic** — off-by-one, broken state, incorrect data flow between components
- **Quick wins** — obvious duplication or dead code in the changed lines only

Stack context:
- Next.js 13 Pages Router, JavaScript (JSX), SCSS + Tailwind CSS
- API routes in `pages/api/` are public — always flag missing validation or rate limiting
- Styles are global (no CSS Modules) — flag accidental nesting or specificity issues
- i18n strings live in `locales/en.js` and `locales/fr.js`

Output format — one section per file that has findings, skip clean files entirely:

**`path/to/file.js`**
- Line N: finding description

Keep findings to real issues only. No style nitpicks. If nothing is wrong, say "No issues found."
