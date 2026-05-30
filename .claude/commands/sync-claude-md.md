---
description: Review changed files and update CLAUDE.md if the project structure or conventions have changed
---

Review the current branch diff against main and update `CLAUDE.md` if anything has changed that it should document.

## Steps

1. Run `git diff main --name-only` to get the list of changed files.
2. Read the changed files that are structurally significant — new or removed components, new style files, new pages, new hooks, new dependencies in `package.json`, changes to `tailwind.config.js`, etc.
3. Read the current `CLAUDE.md`.
4. Compare: does CLAUDE.md still accurately reflect the project? Look for:
   - New components not listed in the Components table
   - Removed or renamed components still listed
   - New SCSS partials not listed in the project structure
   - New dependencies that affect how the project works
   - New conventions or patterns introduced by the changes
   - Anything in the "Known Quirks" section that is no longer true
5. Apply only the updates that are warranted — do not rewrite sections that are still accurate.
6. Show a diff of what changed in CLAUDE.md and briefly explain each update.

## Rules

- Only update CLAUDE.md for structural/architectural facts — file paths, component roles, arrays, conventions, tech stack
- Do not document ephemeral details (current bug state, in-progress work, task context)
- Do not reformat or rewrite sections that are still accurate — minimal edits only
- If nothing needs changing, say so explicitly
