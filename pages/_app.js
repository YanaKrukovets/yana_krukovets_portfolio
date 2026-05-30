import Layout from "../components/Layout";
import ChatWidget from "../components/ChatWidget";
import "../styles/styles.scss";  // single global stylesheet import — all SCSS partials load from here
import Head from "next/head";
import { useRouter } from "next/router";

// Custom App — wraps every page with Layout and conditionally mounts ChatWidget.
// Next.js calls this component for every route; Component is the active page component.
export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {/* Empty Head here so individual pages can inject their own <title> and <meta description>
          via Next.js Head without it being overridden at the app level */}
      <Head></Head>

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
