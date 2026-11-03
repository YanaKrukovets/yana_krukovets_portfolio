import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import { useTypewriter } from "../hooks/useTypewriter";
import { useRouter } from "next/router";
import { trackConversion } from "../lib/analytics";
import { projects, projectsWork } from "../lib/projects";

// Strings the typewriter cycles through in the hero kicker — edit here to add/remove/reorder roles
const ROLES = [
  "Frontend Developer",
  "Full Stack Developer",
  "AI-Assisted Developer",
  "Next.js Developer",
  "React Developer",
  "UI Developer",
];

// "At a glance" strip under the hero. The project count comes from lib/projects.js so it stays accurate.
const FACTS = [
  { value: "6+ years", label: "professional experience" },
  { value: String(projects.length + projectsWork.length), label: "shipped projects" },
  { value: "3", label: "iOS apps on the App Store" },
  { value: "Ottawa", label: "Canada · Eastern Time" },
];

// Asks ChatWidget (mounted in _app.js) to open its panel
const openChat = () => window.dispatchEvent(new Event("open-chat"));

// Hero section — full viewport on the homepage, with the star field behind it.
// On inner pages (/projects, /contact) only the Navbar is rendered — no hero content.
const HeaderBanner = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  // role is the currently displayed typewriter string (updates character by character)
  const role = useTypewriter(isHome ? ROLES : []);

  return (
    <>
      <Navbar />
      {isHome && (
        <div className="hero">
          {/* Star field: three twinkling layers (_stars.scss) plus a few falling stars */}
          <div className="hero__sky" aria-hidden="true">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <span className="falling-star falling-star--1"></span>
            <span className="falling-star falling-star--2"></span>
            <span className="falling-star falling-star--3"></span>
            <span className="falling-star falling-star--4"></span>
          </div>

          <div className="home-container hero__inner">
            <div className="hero__text">
              {/* min-height in CSS stops layout shift as the typewriter text changes length */}
              <p className="hero__kicker">
                Yana Krukovets <span aria-hidden="true">/</span>{" "}
                <span className="sr-only">Full Stack Developer</span>
                <span className="typewriter-text" aria-hidden="true">
                  {role}
                  <span className="typewriter-cursor">|</span>
                </span>
              </p>

              {/* The only h1 on the page — important for SEO page hierarchy */}
              <h1 className="hero__title">
                I build fast, accessible websites. Lately I also teach AI agents to{" "}
                <span className="hero__accent">cheat on purpose.</span>
              </h1>

              <p className="hero__intro">
                I&rsquo;m Yana, a full stack developer in Ottawa, Canada with 6+ years of
                experience. Most of my work is React and Next.js for clients. On the side
                I&rsquo;m learning Python and running small AI safety experiments.
              </p>

              <div className="hero__ctas">
                <a className="hero-cta hero-cta--primary" href="#work">
                  See my work
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 5v14" />
                    <path d="M19 12l-7 7-7-7" />
                  </svg>
                </a>
                <a
                  className="hero-cta"
                  href="/Yana_Krukovets_CV.pdf"
                  download
                  aria-label="Download Yana Krukovets resume (PDF)"
                  onClick={() => trackConversion("cv_downloaded", { path: window.location.pathname })}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3v12" />
                    <path d="M7 10l5 5 5-5" />
                    <path d="M5 21h14" />
                  </svg>
                  Download CV
                </a>
              </div>

              <p className="hero__status">
                <span className="hero__status-dot" aria-hidden="true"></span>
                Open to freelance, contract and full-time roles
              </p>
            </div>

            <div className="hero__side">
              <Image
                className="hero__photo"
                src="/images/components/about/yana_krukovets.jpg"
                width={420}
                height={525}
                sizes="(max-width: 900px) 90vw, 420px"
                alt="Portrait of Yana Krukovets, Full Stack Developer"
                priority={true}
              />
              <button type="button" className="hero__chat" onClick={openChat}>
                <span className="hero__chat-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <span className="hero__chat-text">
                  <span className="hero__chat-title">Ask my AI assistant</span>
                  <span className="hero__chat-sub">It knows my projects, stack and experience</span>
                </span>
              </button>
            </div>
          </div>

          <ul className="hero__facts home-container" aria-label="At a glance">
            {FACTS.map((f) => (
              <li key={f.label}>
                <span className="hero__fact-value">{f.value}</span>
                <span className="hero__fact-label">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default HeaderBanner;
