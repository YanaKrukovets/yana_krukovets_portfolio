import Layout from "../components/Layout";
import ChatWidget from "../components/ChatWidget";
import "../styles/styles.scss";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head></Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
      {router.pathname === "/" && <ChatWidget />}
    </>
  );
}
