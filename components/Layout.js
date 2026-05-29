/* eslint-disable @next/next/next-script-for-ga */
import Head from "next/head";
import React from "react";
import BackToTopButton from "../components/BackToTopButton";
import HeaderBanner from "./HomeBanner";
import Footer from "./Footer";

const SITE_URL = "https://www.yanakrukovets.com";
const OG_IMAGE = `${SITE_URL}/images/og-image.png`;
const DESCRIPTION =
  "Full Stack & Front-End Developer based in Ottawa, Canada. 4+ years of experience building web apps with React, Next.js, TypeScript, GraphQL, Tailwind CSS, WordPress, and more.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yana Krukovets",
  url: SITE_URL,
  jobTitle: ["Full Stack Developer", "Front-End Developer"],
  worksFor: { "@type": "Organization", name: "Elite Digital" },
  address: { "@type": "PostalAddress", addressLocality: "Ottawa", addressRegion: "ON", addressCountry: "CA" },
  sameAs: [
    "https://github.com/YanaKrukovets",
    "https://www.linkedin.com/in/yana-krukovets-25658260/",
  ],
  knowsAbout: ["React", "Next.js", "TypeScript", "JavaScript", "GraphQL", "Tailwind CSS", "WordPress", "PHP", "MySQL"],
};

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Preconnect for Google Fonts — reduces font load latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Open Graph */}
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Yana Krukovets | Full Stack & Front-End Developer — Ottawa" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Yana Krukovets — Full Stack Developer portfolio" />
        <meta property="og:locale" content="en_CA" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="yanakrukovets.com" />
        <meta property="twitter:url" content={`${SITE_URL}/`} />
        <meta name="twitter:title" content="Yana Krukovets | Full Stack & Front-End Developer — Ottawa" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="Yana Krukovets — Full Stack Developer portfolio" />

        <meta name="author" content="Yana Krukovets" />
        <meta name="p:domain_verify" content="155e6479dee7fb2c5ff84b2e5da8957f" />

        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`${SITE_URL}/`} />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Skip link must be first focusable element — before header */}
      <a href="#main" className="skip-to-main-content-link">
        Skip to main content
      </a>

      <header className="max-w-inner">
        <HeaderBanner />
      </header>
      <main className="overflow-x-hidden w-full text-black" id="main">
        <div id="content" className="max-w-inner xxxl:px-0">
          {children}
        </div>
        <BackToTopButton />
        <Footer />
      </main>
    </>
  );
}
