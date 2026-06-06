import Head from "next/head";
import Projects from "../components/Projects";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects | Yana Krukovets — Full Stack Developer Ottawa, Canada</title>
        <meta
          name="description"
          content="Personal and professional projects by Yana Krukovets — Full Stack Developer based in Ottawa, Canada. Built with React, Next.js, TypeScript, GraphQL, Tailwind CSS, and more."
        />
        <meta property="og:title" key="og:title" content="Projects | Yana Krukovets — Full Stack Developer Ottawa" />
        <meta property="og:description" key="og:description" content="Personal and professional projects by Yana Krukovets — Full Stack Developer based in Ottawa, Canada. Built with React, Next.js, TypeScript, GraphQL, Tailwind CSS, and more." />
        <meta name="twitter:title" key="twitter:title" content="Projects | Yana Krukovets — Full Stack Developer Ottawa" />
        <meta name="twitter:description" key="twitter:description" content="Personal and professional projects by Yana Krukovets — Full Stack Developer based in Ottawa, Canada. Built with React, Next.js, TypeScript, GraphQL, Tailwind CSS, and more." />
      </Head>
      <div className="max-w-inner xxxl:px-0">
        <Projects />
      </div>
    </>
  );
}
