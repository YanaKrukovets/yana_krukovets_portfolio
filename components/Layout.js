/* eslint-disable @next/next/next-script-for-ga */
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import BackToTopButton from "../components/BackToTopButton";
import HeaderBanner from "./HomeBanner";
import Footer from "./Footer";

// Centralised constants — used across OG, Twitter, canonical, and JSON-LD tags
// so changing the domain in one place updates all meta tags at once
const SITE_URL = "https://www.yanakrukovets.com";
const OG_IMAGE = `${SITE_URL}/images/og-image.png`;
const DESCRIPTION =
  "Full Stack & Front-End Developer based in Ottawa, Canada. 4+ years of experience building web apps with React, Next.js, TypeScript, GraphQL, Tailwind CSS, WordPress, and more.";

// Schema.org Person structured data — helps search engines understand who owns this site
// and surfaces rich results (job title, location, social profiles) in Google Search
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

// Serialised once at module level — avoids re-stringifying on every render
const jsonLdString = JSON.stringify(jsonLd);

// Root layout wrapper — wraps every page via _app.js.
// Owns all shared meta tags so individual pages only need to set <title> and <description>.
export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isHome = pathname === "/";
  const isErrorPage = pathname === "/404" || pathname === "/500";
  const canonicalUrl = isErrorPage ? null : (isHome ? `${SITE_URL}/` : `${SITE_URL}${pathname}`);
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Open Graph — controls how the link preview looks when shared on social media */}
        <meta property="og:url" key="og:url" content={canonicalUrl} />
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:site_name" content="Yana Krukovets" />
        <meta property="og:title" key="og:title" content="Yana Krukovets | Full Stack & Front-End Developer — Ottawa" />
        <meta property="og:description" key="og:description" content={DESCRIPTION} />
        <meta property="og:image" key="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" key="og:image:width" content="1200" />
        <meta property="og:image:height" key="og:image:height" content="630" />
        <meta property="og:image:alt" key="og:image:alt" content="Yana Krukovets — Full Stack Developer portfolio" />
        <meta property="og:locale" content="en_CA" />

        {/* Twitter / X card — summary_large_image shows the full-width preview image */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="yanakrukovets.com" />
        <meta property="twitter:url" key="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" key="twitter:title" content="Yana Krukovets | Full Stack & Front-End Developer — Ottawa" />
        <meta name="twitter:description" key="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" key="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="Yana Krukovets — Full Stack Developer portfolio" />

        <meta name="author" content="Yana Krukovets" />
        {/* Pinterest domain verification tokens */}
        <meta name="p:domain_verify" content="155e6479dee7fb2c5ff84b2e5da8957f" />
        <meta name="p:domain_verify" content="b5004b976bb28d76591224d39f9edad0" />

        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
        {/* Canonical prevents duplicate-content penalties if the page is ever indexed under multiple URLs */}
        {canonicalUrl && <link rel="canonical" key="canonical" href={canonicalUrl} />}

        {/* Inject JSON-LD as a plain string — dangerouslySetInnerHTML is safe here because
            the data comes from a hardcoded constant, not user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </Head>

      {/* Skip link must be the first focusable element on the page —
          keyboard and screen-reader users can jump straight to content without tabbing through the nav */}
      <a href="#main" className="skip-to-main-content-link">
        Skip to main content
      </a>

      {/* Hero / nav lives in <header> outside <main> so landmark navigation is correct for assistive tech */}
      <header className={`max-w-inner${isHome ? " home-header" : ""}`}>
        <HeaderBanner />
      </header>
      <main className="overflow-x-hidden w-full text-black" id="main">
        <div id="content" className="max-w-inner xxxl:px-0">
          {/* Page-specific content injected here (About, Projects, Contact via index.js) */}
          {children}
        </div>
        {!isErrorPage && <BackToTopButton />}
        {!isErrorPage && <Footer />}
      </main>
    </>
  );
}
