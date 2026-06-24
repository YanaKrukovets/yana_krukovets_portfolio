import React from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import { useTypewriter } from "../hooks/useTypewriter";
import { useRouter } from "next/router";

// Strings the typewriter cycles through in the hero h2 — edit here to add/remove/reorder roles
const ROLES = [
  "Frontend Developer",
  "Full Stack Developer",
  "AI-Assisted Developer",
  "Next.js Developer",
  "UI Developer",
  "fascinated by how AI systems work behind the scenes",
];

// Hero section — occupies the full viewport above the fold on the homepage.
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
        <div className="max-w-inner xxxl:px-0">

          {/* Three layered star divs — CSS keyframe animations in _stars.scss
              create a parallax-style twinkling effect at different speeds and sizes */}
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>

          <div className="content-wrapper">
            <div
              className="text-center font-roboto welcome md:mt-[40%]"
              id="welcome"
            >
              {/* h1 is the only h1 on the page — important for SEO page hierarchy */}
              <h1 className="text-[40px] leading-[85px] md:text-[35px] md:leading-[60px] sm:text-[30px] sm:leading-[40px] md:mt-[30px]">
                Hello! My name is Yana Krukovets
              </h1>
              <h2 className="text-[25px] leading-[55px] min-h-[55px]" aria-label="I am a Full Stack Developer">
                I am a{" "}
                {/* min-h prevents layout shift as the typewriter text changes length */}
                <span className="typewriter-text">
                  {role}
                  {/* Blinking cursor — aria-hidden so screen readers don't read it as content */}
                  <span className="typewriter-cursor" aria-hidden="true">|</span>
                </span>
              </h2>
              <h3 className="text-[20px] leading-[50px] md:text-[18px] md:leading-[30px]">
                Let&apos;s make a new life in the Network
              </h3>

              {/* CTA buttons — animated border effect defined in _home.scss */}
              <div className="mt-[20px]">
                {/* Four empty <span>s are required by the CSS animated border trick */}
                <Link className="my-work-btn sm:my-[20px]" href="/projects">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  Check my work
                </Link>
                <Link className="my-work-btn" href="/contact">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  Contact me
                </Link>
              </div>
            </div>
          </div>

          {/* Animated scroll-down indicator — clicking it jumps to the About section */}
          <a href="#about" aria-label="Scroll down to About section">
            <div className="container">
              <div className="field">
                <div className="scroll"></div>
              </div>
            </div>
          </a>
        </div>
      )}
    </>
  );
};

export default HeaderBanner;
