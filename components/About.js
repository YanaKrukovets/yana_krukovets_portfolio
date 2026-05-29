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

const SKILLS = [
  { icon: SiHtml5, label: "HTML5", color: "#e34f26" },
  { icon: SiCss3, label: "CSS3", color: "#1572b6" },
  { icon: SiJavascript, label: "JavaScript", color: "#f7df1e" },
  { icon: SiReact, label: "ReactJS", color: "#61dafb" },
  { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { icon: SiTailwindcss, label: "Tailwind", color: "#38bdf8" },
  { icon: SiJquery, label: "jQuery", color: "#0769ad" },
  { icon: SiBootstrap, label: "Bootstrap", color: "#7952b3" },
  { icon: SiWordpress, label: "WordPress", color: "#21759b" },
  { icon: SiSanity, label: "Sanity", color: "#f03e2f" },
  { icon: SiPhp, label: "PHP", color: "#777bb4" },
  { icon: SiMysql, label: "mySQL", color: "#4479a1" },
];

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

const About = () => {
  const { ref: bioRef, isVisible: bioVisible } = useScrollReveal(0.1);
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal(0.1);
  const { ref: expRef, isVisible: expVisible } = useScrollReveal(0.1);
  const { ref: socialRef, isVisible: socialVisible } = useScrollReveal(0.1);

  return (
    <div id="about" className="about content-wrapper font-roboto">

      {/* Bio + Photo */}
      <div
        ref={bioRef}
        className={`flex justify-between gap-2 pt-[20px] md:pt-[0px] md:flex-col max-w-[1100px] mx-auto reveal${bioVisible ? " reveal--visible" : ""}`}
      >
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
            TypeScript, GraphQL, Tailwind CSS, and more. I have hands-on
            experience with Agile/SCRUM teams, full SDLC, and building both
            MVC and MVVM applications.
          </p>
          <p className="mt-[12px]">
            Beyond the code, I&rsquo;m genuinely excited about AI — keeping up
            with the evolving landscape of models and tooling, and finding
            practical ways to integrate AI into everyday development workflows.
          </p>

          {/* Hobbies */}
      <div className="max-w-[1100px] mx-auto mt-[40px]">
        <h3 className="pb-[10px] text-[20px]">
          <b>Hobbies</b>
        </h3>
        <p>
          I like to spend time with my family, play with kids, traveling,
          cycling, hiking, painting.
        </p>
      </div>

          {/* Resume download */}
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

      {/* Skills Icon Grid */}
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
              <Icon className="skill-icon" style={{ color }} aria-hidden="true" />
              <span className="skill-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
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
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-content">
                <span className="timeline-period">{item.period}</span>
                <p className="timeline-role">
                  {item.role} at{" "}
                  <a
                    href={item.href}
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
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

      {/* Social */}
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
