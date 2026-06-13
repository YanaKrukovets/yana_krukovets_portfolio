import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found | Yana Krukovets — Web Developer</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>
      <div className="error-page">
        <div id="stars" aria-hidden="true"></div>
        <div id="stars2" aria-hidden="true"></div>
        <div id="stars3" aria-hidden="true"></div>
        <div className="error-content">
          <span className="error-emoji" aria-hidden="true">🧑‍🚀</span>
          <div className="error-code" aria-hidden="true">404</div>
          <h1 className="error-title">Lost in Space</h1>
          <p className="error-subtitle">
            This page drifted off into the cosmos. It may have never existed,
            or perhaps it floated away into a black hole.
          </p>
          <div className="error-actions">
            <Link href="/" className="error-btn">
              Back to Earth
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
