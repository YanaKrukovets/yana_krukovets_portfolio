import About from "../components/About";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Yana Krukovets | Full Stack &amp; Front-End Developer — Ottawa, Canada</title>
        <meta
          name="description"
          content="Full Stack & Front-End Developer based in Ottawa, Canada. 4+ years of experience building web apps with React, Next.js, TypeScript, GraphQL, Tailwind CSS, WordPress, and more."
        />
        <meta property="og:title" key="og:title" content="Yana Krukovets | Full Stack & Front-End Developer — Ottawa" />
        <meta property="og:description" key="og:description" content="Full Stack & Front-End Developer based in Ottawa, Canada. 4+ years of experience building web apps with React, Next.js, TypeScript, GraphQL, Tailwind CSS, WordPress, and more." />
        <meta name="twitter:title" key="twitter:title" content="Yana Krukovets | Full Stack & Front-End Developer — Ottawa" />
        <meta name="twitter:description" key="twitter:description" content="Full Stack & Front-End Developer based in Ottawa, Canada. 4+ years of experience building web apps with React, Next.js, TypeScript, GraphQL, Tailwind CSS, WordPress, and more." />
      </Head>
      <div className="max-w-inner xxxl:px-0">
        <About />
      </div>
    </>
  );
}
