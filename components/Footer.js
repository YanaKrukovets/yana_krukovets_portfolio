import React from "react";
import Link from "next/link";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { trackConversion } from "../lib/analytics";

export default function Footer() {
  return (
    <footer className="site-footer purple">
      <div className="footer-inner">

        <div className="footer-top">
          {/* Left — brand */}
          <div className="footer-brand">
            <span className="footer-name">Yana Krukovets</span>
            <span className="footer-tagline">Full Stack Developer — Ottawa, Canada</span>
          </div>

          {/* Right — two-column nav */}
          <nav className="footer-nav" aria-label="Footer navigation">
            <div className="footer-nav-col">
              <Link href="/#about">About</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="footer-nav-col">
              <a
                href="/Yana_Krukovets_CV.pdf"
                download
                aria-label="Download resume (PDF)"
                onClick={() => trackConversion("cv_downloaded", { path: window.location.pathname })}
              >
                Resume
              </a>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <div className="footer-social">
                <a
                  href="https://github.com/YanaKrukovets"
                  aria-label="GitHub profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/yana-krukovets-25658260/"
                  aria-label="LinkedIn profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillLinkedin size={20} />
                </a>
              </div>
            </div>
          </nav>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom text-center">
          <span>© Yana Krukovets, 2026</span>
        </div>

      </div>
    </footer>
  );
}
