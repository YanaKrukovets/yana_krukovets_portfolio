import About from "../components/About";
import HomeWork from "../components/HomeWork";
import HomeWriting from "../components/HomeWriting";
import HomeContact from "../components/HomeContact";
import Head from "next/head";

// Homepage-only fonts (headings + body); display=swap keeps text visible while they load.
const HOME_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap";

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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={HOME_FONT_URL} />
      </Head>
      <HomeWork />
      <About />
      <HomeWriting />
      <HomeContact />
    </>
  );
}
