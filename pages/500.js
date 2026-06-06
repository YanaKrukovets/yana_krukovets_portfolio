import Head from "next/head";
import Link from "next/link";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 — Server Error | Yana Krukovets — Web Developer</title>
        <meta name="description" content="An unexpected server error occurred." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="error-page error-page--500">
        <div id="stars" aria-hidden="true"></div>
        <div id="stars2" aria-hidden="true"></div>
        <div id="stars3" aria-hidden="true"></div>
        <div className="error-content">
          <span className="error-emoji" aria-hidden="true">💥</span>
          <div className="error-code error-code--500" aria-hidden="true">500</div>
          <h1 className="error-title">Server Supernova</h1>
          <p className="error-subtitle">
            Something went supernova on our end. We&apos;re already suiting up
            to investigate the wreckage.
          </p>
          <div className="error-actions">
            <Link href="/" className="error-btn error-btn--500">
              Go Home
            </Link>
            <button
              className="error-btn error-btn--ghost"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
