import About from "../components/About";
import Head from "next/head";
import Projects from "../components/Projects";
import ContactForm from "../components/Contact";

export default function Home() {
  return (
    <>
      <Head>
        <title>Yana Krukovets | Full Stack &amp; Front-End Developer — Ottawa, Canada</title>
        <meta
          name="description"
          content="Full Stack &amp; Front-End Developer based in Ottawa, Canada. 4+ years of experience building web apps with React, Next.js, TypeScript, GraphQL, Tailwind CSS, WordPress, and more."
        />
      </Head>
      <div className="max-w-inner xxxl:px-0">
        <About />
        <Projects />
        <ContactForm />
      </div>
    </>
  );
}
