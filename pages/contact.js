import Head from "next/head";
import ContactForm from "../components/Contact";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Yana Krukovets — Full Stack Developer Ottawa</title>
        <meta
          name="description"
          content="Get in touch with Yana Krukovets — Full Stack & Front-End Developer based in Ottawa, Canada. Available for freelance, contract, and full-time opportunities."
        />
        <meta property="og:title" key="og:title" content="Contact | Yana Krukovets — Full Stack Developer Ottawa" />
        <meta property="og:description" key="og:description" content="Get in touch with Yana Krukovets — Full Stack & Front-End Developer based in Ottawa, Canada. Available for freelance, contract, and full-time opportunities." />
        <meta name="twitter:title" key="twitter:title" content="Contact | Yana Krukovets — Full Stack Developer Ottawa" />
        <meta name="twitter:description" key="twitter:description" content="Get in touch with Yana Krukovets — Full Stack & Front-End Developer based in Ottawa, Canada. Available for freelance, contract, and full-time opportunities." />
      </Head>
      <ContactForm />
    </>
  );
}
