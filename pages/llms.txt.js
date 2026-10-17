import { BLOG_POSTS } from "../lib/blogPosts";
import { projects, projectsWork } from "../lib/projects";
import { SITE_URL } from "../lib/site";

// llms.txt — a plain-Markdown summary of the site for AI assistants (llmstxt.org).
// Generated from lib/blogPosts.js and lib/projects.js so it never drifts from the
// real content. Served at /llms.txt — the page component renders nothing;
// getServerSideProps writes the text straight to the response.

function buildLlmsTxt() {
  const personal = projects
    .map((p) => `- [${p.name}](${p.href}): ${p.description} Built with ${p.tech}. (${p.year})`)
    .join("\n");

  const work = projectsWork
    .map((p) => `- [${p.name}](${p.href}): ${p.description} Built with ${p.tech}. (${p.year})`)
    .join("\n");

  const posts = BLOG_POSTS.map(
    (post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description} (${post.category}, ${post.isoDate})`
  ).join("\n");

  return `# Yana Krukovets

> Yana Krukovets is a Full Stack Developer with a focus on the frontend, based in Ottawa, Canada, with 6+ years of professional experience. She builds fast, accessible websites and web apps with React, Next.js, JavaScript, Tailwind CSS, WordPress, and PHP, uses AI-assisted development tools daily, and is available for remote, freelance, contract, and full-time work.

This is her personal portfolio. It covers who she is, the projects she has built, and a blog with notes from real projects on web development, WordPress, performance, SEO, and AI.

## Pages

- [About](${SITE_URL}/): Bio, skills, and work experience
- [Projects](${SITE_URL}/projects): Personal projects and client work, filterable by technology
- [Blog](${SITE_URL}/blog): All blog posts
- [Contact](${SITE_URL}/contact): Contact form for project and job enquiries

## Personal projects

${personal}

## Client work

Built as part of the team at Elite Digital, a digital marketing agency in Ontario, Canada.

${work}

## Blog posts

${posts}

## Optional

- [Resume (PDF)](${SITE_URL}/Yana_Krukovets_CV.pdf): Downloadable CV
- [GitHub](https://github.com/YanaKrukovets): Source code for personal projects
- [LinkedIn](https://www.linkedin.com/in/yana-krukovets-25658260/): Professional profile
- [RSS feed](${SITE_URL}/rss.xml): Blog feed
`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildLlmsTxt());
  res.end();
  return { props: {} };
}

export default function LlmsTxt() {
  return null;
}
