import Layout from "../components/Layout";
import ChatWidget from "../components/ChatWidget";
import "../styles/styles.scss";  // single global stylesheet import — all SCSS partials load from here
import Head from "next/head";
import { useRouter } from "next/router";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Anek+Latin:wght@100..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";

// Custom App — wraps every page with Layout and conditionally mounts ChatWidget.
// Next.js calls this component for every route; Component is the active page component.
export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {/* Fonts loaded non-blocking: media="print" means the browser won't block render on this
          stylesheet; onLoad swaps it to media="all" once it has downloaded. */}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href={FONT_URL} />
        <link
          rel="stylesheet"
          href={FONT_URL}
          media="print"
          onLoad={(e) => { e.currentTarget.media = "all"; }}
        />
      </Head>

      <Layout>
        {/* Renders the current page (e.g. index.js → About + Projects + Contact) */}
        <Component {...pageProps} />
      </Layout>

      {/* ChatWidget is only shown on the homepage — it's specific to the portfolio context
          and would be out of place on error pages (404, 500) */}
      {router.pathname === "/" && <ChatWidget />}
    </>
  );
}
