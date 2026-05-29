---
description: Update bio, skills, experience, or hobbies in About.js
---

Ask me which section I want to update:

1. **Bio** — the introductory paragraph ("My name is Yana Krukovets...")
2. **Skills** — the comma-separated skills list
3. **Experience** — work history entries (date, company, location)
4. **Hobbies** — the hobbies paragraph

Then ask me for the new content for that section.

All content lives in `components/About.js` as hardcoded JSX strings. Make the change directly in that file.

Important rules:
- Keep the existing JSX structure and Tailwind classes unchanged — only update the text content
- Experience entries use this shape — preserve it:
  ```jsx
  <p>
    <b>Jan 2023 - Jan 2024:</b> Frontend Developer at{" "}
    <a href="https://..." className="underline" target="_blank" rel="noreferrer">
      <i>Company Name</i>
    </a>{" "}
    City, Country
  </p>
  ```
- Do not add `rel="noreferrer"` only to new links — match the pattern of the nearest existing link
- Do not convert the file to TypeScript

After making the change, show me a diff of what changed.
