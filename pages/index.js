import About from "../components/About";
import Head from "next/head";
import Projects from "../components/Projects";
import ContactForm from "../components/Contact";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Yana Krukovets. Front-End Web Developer. Ottawa, Canada</title>
        <meta
          name="description"
          content="Yana Krukovets. Front-End Web Developer | Portfolio. Ottawa, Canada"
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
