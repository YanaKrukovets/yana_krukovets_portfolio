---
description: Add a new project card to the portfolio
---

Ask me for the following details one by one, then add the project:

1. **Name** — the project name, shown as the card heading
2. **Description** — one sentence on what the project is
3. **Project URL** — the live URL (href)
4. **Image filename** — the screenshot filename that will be placed in `public/images/components/projects/` (e.g. `myproject.jpg`)
5. **Alt text** — a short accessibility description of the image
6. **Label** — one of: `Personal Project`, `Elite Digital Project`, or a custom label
7. **Tech stack** — comma-separated list of technologies (e.g. `Next.js, Tailwind CSS, Sass`)
8. **Year** — the year the project was completed (e.g. `2025`)
9. **Array** — should this go in `projects` (personal) or `projectsWork` (professional)?

Once I have all details, add a new entry to the correct array in `lib/projects.js` following the existing shape:

```js
{
  name: "...",
  href: "https://...",
  src: "/images/components/projects/filename.jpg",
  alt: "...",
  text: "...",
  tech: "...",
  year: "2025",
  description: "...",
}
```

Add it as the **first** item in the array (most recent first).

Then confirm what was added and remind me to place the screenshot at `public/images/components/projects/<filename>`.
