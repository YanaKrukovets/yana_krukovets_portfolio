import React from "react";
import Image from "next/image";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJquery,
  SiBootstrap,
  SiWordpress,
  SiSanity,
  SiPhp,
  SiMysql,
} from "react-icons/si";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Each entry renders as a branded icon + label in the skills grid.
// color matches the technology's official brand colour so the icons look recognisable.
const SKILLS = [
  { icon: SiHtml5, label: "HTML5", color: "#e34f26" },
  { icon: SiCss3, label: "CSS3", color: "#1572b6" },
  { icon: SiJavascript, label: "JavaScript", color: "#f7df1e" },
  { icon: SiReact, label: "ReactJS", color: "#61dafb" },
  { icon: SiNextdotjs, label: "Next.js", color: "#000000" },
  { icon: SiTailwindcss, label: "Tailwind", color: "#38bdf8" },
  { icon: SiJquery, label: "jQuery", color: "#0769ad" },
  { icon: SiBootstrap, label: "Bootstrap", color: "#7952b3" },
  { icon: SiWordpress, label: "WordPress", color: "#21759b" },
  { icon: SiSanity, label: "Sanity", color: "#f03e2f" },
  { icon: SiPhp, label: "PHP", color: "#777bb4" },
  { icon: SiMysql, label: "mySQL", color: "#4479a1" },
];

// Rendered as a vertical timeline — most recent entry first.
// href links to the company website (opens in a new tab).
const EXPERIENCE = [
  {
    period: "Jul 2025 — May 2026",
    role: "Full Stack Developer",
    company: "Elite Digital",
    href: "https://elitedigitalagency.com/",
    location: "Ontario, Canada",
  },
  {
    period: "Jan 2023 — Jan 2024",
    role: "Frontend Developer",
    company: "Elite Digital",
    href: "https://elitedigitalagency.com/",
    location: "Ontario, Canada",
  },
  {
    period: "Jan 2013 — May 2016",
    role: "Frontend Developer",
    company: "SoftServe",
    href: "https://www.softserveinc.com",
    location: "Dnipro, Ukraine",
  },
  {
    period: "2011 — 2013",
    role: "Teacher C++",
    company: "IT Academy \"Step\"",
    href: "https://itstep.org",
    location: "Dnipro, Ukraine",
  },
];

// About section — bio, skills grid, experience timeline, and social links.
// Each sub-block has its own scroll reveal so they animate in independently as the user scrolls down.
const About = () => {
  // Each useScrollReveal call returns a ref to attach to a DOM node and a boolean that
  // flips true once that node enters the viewport — triggers the CSS reveal animation
  const { ref: bioRef, isVisible: bioVisible } = useScrollReveal(0.1);
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal(0.1);
  const { ref: expRef, isVisible: expVisible } = useScrollReveal(0.1);
  const { ref: socialRef, isVisible: socialVisible } = useScrollReveal(0.1);

  return (
    <div id="about" className="about content-wrapper font-roboto">

      {/* Bio + Photo — slides in from the left when it enters the viewport */}
      <div
        ref={bioRef}
        className={`flex justify-between gap-2 pt-[20px] md:pt-[0px] md:flex-col max-w-[1100px] mx-auto reveal${bioVisible ? " reveal--visible" : ""}`}
      >
        {/* Photo — inline style drives the reveal animation because the transform values
            are data-driven (visible/hidden) and can't be expressed as static Tailwind classes */}
        <div className="my-auto reveal reveal--left" style={{ transitionDelay: "0.1s", opacity: bioVisible ? 1 : 0, transform: bioVisible ? "translateX(0)" : "translateX(-32px)" }}>
          <Image
            className="profile-img"
            src="/images/components/about/yana_krukovets.jpg"
            height={270}
            width={270}
            alt="Yana Krukovets photo"
          />
        </div>
        <div className="max-w-[65%] md:max-w-full md:mt-[10px]">
          <h3 className="pb-[10px] text-[20px]">
            <b>Who am I?</b>
          </h3>
          <p>
            My name is Yana Krukovets. I&rsquo;m a Full Stack Developer based
            in Ottawa, Canada, with 4+ years of professional experience. I like
            to code things from scratch and enjoy bringing ideas to life in the
            browser.
          </p>
          <p className="mt-[12px]">
            I work across the full stack — from database and API design to
            polished, user-facing front-end work — using React, Next.js,
            JavaScript, GraphQL, Tailwind CSS, and more. I have hands-on
            experience with Agile/SCRUM teams, full SDLC, and building both
            MVC and MVVM applications.
          </p>
          <p className="mt-[12px]">
            Beyond the code, I&rsquo;m genuinely excited about AI — keeping up
            with the evolving landscape of models and tooling, and finding
            practical ways to integrate AI into everyday development workflows.
          </p>

          {/* Hobbies */}
          <div className="mt-[20px]">
            <p>Outside of work, I enjoy pursuing activities that
              help me recharge and stay inspired. Whether it&apos;s discovering a great film, painting, hiking, biking,
              skiing, skating or making memories with my family,
              I appreciate experiences that bring both excitement and balance to life.
            </p>
          </div>

          {/* Resume download — the `download` attribute tells the browser to save the file
              rather than open it; aria-label makes the purpose clear to screen readers */}
          <div className="mt-[20px]">
            <a
              href="/Yana_Krukovets_CV.pdf"
              download
              className="btn inline-flex items-center gap-[8px] mt-[10px]"
              aria-label="Download Yana Krukovets resume"
            >
              <FontAwesomeIcon icon={faDownload} className="w-4" />
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* Skills Icon Grid — maps SKILLS array to icon + label pairs */}
      <div
        ref={skillsRef}
        className={`max-w-[1100px] mx-auto mt-[40px] reveal${skillsVisible ? " reveal--visible" : ""}`}
      >
        <h3 className="pb-[10px] text-[20px]">
          <b>Skills</b>
        </h3>
        <div className="skills-grid">
          {SKILLS.map(({ icon: Icon, label, color }) => (
            <div key={label} className="skill-item">
              {/* aria-hidden because the label below already describes the icon */}
              <Icon className="skill-icon" style={{ color }} aria-hidden="true" />
              <span className="skill-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline — maps EXPERIENCE array to a vertical dot-line timeline */}
      <div
        ref={expRef}
        className={`max-w-[1100px] mx-auto mt-[40px] reveal${expVisible ? " reveal--visible" : ""}`}
      >
        <h3 className="pb-[10px] text-[20px]">
          <b>Experience</b>
        </h3>
        <div className="timeline">
          {EXPERIENCE.map((item, i) => (
            <div
              key={i}
              className="timeline-item"
            >
              {/* Decorative dot on the timeline line — aria-hidden so screen readers skip it */}
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-content">
                <span className="timeline-period">{item.period}</span>
                <p className="timeline-role">
                  {item.role} at{" "}
                  <a
                    href={item.href}
                    className="underline"
                    target="_blank"
                    rel="noreferrer"  // noreferrer prevents the new tab from accessing window.opener
                  >
                    <i>{item.company}</i>
                  </a>
                </p>
                <span className="timeline-location">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social links — GitHub and LinkedIn icons from react-icons */}
      <div
        ref={socialRef}
        className={`flex justify-center py-[10px] mt-[20px] social reveal${socialVisible ? " reveal--visible" : ""}`}
      >
        <a
          href="https://github.com/YanaKrukovets"
          target="_blank"
          rel="noreferrer"
          aria-label="Link to Yana Krukovets Github"
        >
          {/* role="presentation" because the parent <a> already has an aria-label */}
          <AiFillGithub className="social-media" role="presentation" />
        </a>
        <a
          href="https://www.linkedin.com/in/yana-krukovets-25658260/"
          target="_blank"
          rel="noreferrer"
          aria-label="Link to Yana Krukovets linkedin account"
        >
          <AiFillLinkedin className="social-media" role="presentation" />
        </a>
      </div>
    </div>
  );
};

export default About;
