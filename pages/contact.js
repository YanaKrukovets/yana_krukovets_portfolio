import Head from "next/head";
import ContactForm from "../components/Contact";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Yana Krukovets — Full Stack Developer Ottawa, Canada</title>
        <meta
          name="description"
          content="Get in touch with Yana Krukovets — Full Stack & Frontend Developer in Ottawa, Canada. Available for remote, freelance, contract, and onsite opportunities."
        />
        <meta property="og:title" key="og:title" content="Contact | Yana Krukovets — Full Stack Developer Ottawa, Canada" />
        <meta property="og:description" key="og:description" content="Get in touch with Yana Krukovets — Full Stack & Frontend Developer in Ottawa, Canada. Available for remote, freelance, contract, and onsite opportunities." />
        <meta name="twitter:title" key="twitter:title" content="Contact | Yana Krukovets — Full Stack Developer Ottawa" />
        <meta name="twitter:description" key="twitter:description" content="Get in touch with Yana Krukovets — Full Stack & Frontend Developer in Ottawa, Canada. Available for remote, freelance, contract, and onsite opportunities." />
      </Head>
      <ContactForm />
    </>
  );
}
