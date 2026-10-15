import Head from "next/head";
import Projects from "../components/Projects";
import { projects, projectsWork } from "../lib/projects";
import { SITE_URL, PERSON_ID, WEBSITE_ID } from "../lib/site";

// Personal projects name Yana as creator; client work was built as part of the Elite Digital team,
// so she is listed as a contributor there
const toListItem = (project, index, role) => ({
  "@type": "ListItem",
  position: index + 1,
  item: {
    "@type": "CreativeWork",
    name: project.name,
    url: project.href,
    description: project.description,
    dateCreated: project.year,
    keywords: project.tech,
    [role]: { "@id": PERSON_ID },
  },
});

const projectsJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/projects#webpage`,
  url: `${SITE_URL}/projects`,
  name: "Projects by Yana Krukovets",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      ...projects.map((p, i) => toListItem(p, i, "creator")),
      ...projectsWork.map((p, i) => toListItem(p, projects.length + i, "contributor")),
    ],
  },
});

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects | Yana Krukovets — Full Stack Developer Ottawa, Canada</title>
        <meta
          name="description"
          content="Personal and professional projects by Yana Krukovets, a Full Stack Developer in Ottawa, Canada. Built with React, Next.js, TypeScript, GraphQL, and more."
        />
        <meta property="og:title" key="og:title" content="Projects | Yana Krukovets — Full Stack Developer Ottawa" />
        <meta property="og:description" key="og:description" content="Personal and professional projects by Yana Krukovets, a Full Stack Developer in Ottawa, Canada. Built with React, Next.js, TypeScript, GraphQL, and more." />
        <meta name="twitter:title" key="twitter:title" content="Projects | Yana Krukovets — Full Stack Developer Ottawa" />
        <meta name="twitter:description" key="twitter:description" content="Personal and professional projects by Yana Krukovets, a Full Stack Developer in Ottawa, Canada. Built with React, Next.js, TypeScript, GraphQL, and more." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: projectsJsonLd }}
        />
      </Head>
      <div className="max-w-inner xxxl:px-0">
        <Projects />
      </div>
    </>
  );
}
