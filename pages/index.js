import About from "../components/About";
import Head from "next/head";
import Projects from "../components/Projects";
import ContactForm from "../components/Contact";

// Home page — the only page with real content.
// Layout (header, footer, BackToTopButton) is injected by _app.js via Layout.js.
// The <Head> here overrides the shared meta tags in Layout.js for title and description only.
export default function Home() {
  return (
    <>
      <Head>
        {/* Page-specific title and description — Layout.js handles all other meta tags (OG, Twitter, etc.) */}
        <title>Yana Krukovets | Full Stack &amp; Front-End Developer — Ottawa, Canada</title>
        <meta
          name="description"
          content="Full Stack &amp; Front-End Developer based in Ottawa, Canada. 4+ years of experience building web apps with React, Next.js, TypeScript, GraphQL, Tailwind CSS, WordPress, and more."
        />
      </Head>
      {/* Sections in scroll order — About → Projects → Contact */}
      <div className="max-w-inner xxxl:px-0">
        <About />
        <Projects />
        <ContactForm />
      </div>
    </>
  );
}
