import React from "react";
import Link from "next/link";

// Closing call-to-action on the homepage (blog posts use BlogCta instead)
export default function HomeContact() {
  return (
    <section className="home-section home-container" aria-labelledby="home-contact-heading">
      <div className="home-contact">
        <div className="home-contact__text">
          <h2 id="home-contact-heading" className="home-contact__title">Have a project in mind?</h2>
          <p>
            Freelance, contract or full-time: tell me what you&rsquo;re building and I&rsquo;ll get
            back to you.
          </p>
        </div>
        <div className="home-contact__actions">
          <Link className="hero-cta hero-cta--primary" href="/contact">
            Send a message
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </Link>
          <a className="hero-cta" href="https://www.linkedin.com/in/yana-krukovets-25658260/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
