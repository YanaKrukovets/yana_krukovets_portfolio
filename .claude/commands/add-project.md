---
description: Add a new project card to the portfolio
---

Ask me for the following details one by one, then add the project:

1. **Project URL** — the live URL (href)
2. **Image filename** — the screenshot filename that will be placed in `public/images/components/projects/` (e.g. `myproject.jpg`)
3. **Alt text** — a short accessibility description of the image
4. **Label** — one of: `Personal Project`, `Elite Digital Project`, or a custom label
5. **Tech stack** — comma-separated list of technologies (e.g. `Next.js, Tailwind CSS, Sass`)
6. **Year** — the year the project was completed (e.g. `2025`)
7. **Array** — should this go in `projects` (personal, shown on site) or `projectsWork` (professional, currently hidden)?

Once I have all details, add a new entry to the correct array in `components/Projects.js` following the existing shape:

```js
{
  href: "https://...",
  src: "/images/components/projects/filename.jpg",
  alt: "...",
  text: "...",
  tech: "...",
  year: "2025",
}
```

Add it as the **first** item in the array (most recent first).

Then confirm what was added and remind me to place the screenshot at `public/images/components/projects/<filename>`.
