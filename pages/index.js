import About from "../components/About";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Yana Krukovets | Full Stack &amp; Frontend Developer — Ottawa, Canada</title>
        <meta
          name="description"
          content="Full Stack & Frontend Developer in Ottawa, Canada — available for remote, freelance, and onsite work. React, Next.js, TypeScript, and AI-assisted development."
        />
        <meta property="og:title" key="og:title" content="Yana Krukovets | Full Stack & Frontend Developer — Ottawa" />
        <meta property="og:description" key="og:description" content="Full Stack & Frontend Developer in Ottawa, Canada — available for remote, freelance, and onsite work. React, Next.js, TypeScript, and AI-assisted development." />
        <meta name="twitter:title" key="twitter:title" content="Yana Krukovets | Full Stack & Frontend Developer — Ottawa" />
        <meta name="twitter:description" key="twitter:description" content="Full Stack & Frontend Developer in Ottawa, Canada — available for remote, freelance, and onsite work. React, Next.js, TypeScript, and AI-assisted development." />
      </Head>
      <div className="max-w-inner xxxl:px-0">
        <About />
      </div>
    </>
  );
}
