import Layout from "../components/Layout";
import ChatWidget from "../components/ChatWidget";
import "../styles/styles.scss";  // single global stylesheet import — all SCSS partials load from here
import Head from "next/head";
import { useRouter } from "next/router";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Anek+Latin:wght@100..800&family=Roboto:wght@100;300;400;500;700;900&display=swap";

// Custom App — wraps every page with Layout and conditionally mounts ChatWidget.
// Next.js calls this component for every route; Component is the active page component.
export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {/* Non-blocking font load: media="print" skips render-blocking; onLoad swaps to "all" once downloaded. */}
      <Head>
        <link rel="stylesheet" media="print" onLoad="this.media='all'" href={FONT_URL} />
        <noscript>
          <link rel="stylesheet" href={FONT_URL} />
        </noscript>
      </Head>

      <Layout>
        {/* Renders the current page (e.g. index.js → About + Projects + Contact) */}
        <Component {...pageProps} />
      </Layout>

      {/* ChatWidget shown on all portfolio pages; excluded from error pages */}
      {!["/404", "/500"].includes(router.pathname) && <ChatWidget />}
    </>
  );
}
