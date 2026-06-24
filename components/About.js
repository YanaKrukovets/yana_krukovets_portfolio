import React from "react";
import Image from "next/image";
import Link from "next/link";
import { trackConversion } from "../lib/analytics";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
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
  SiPostgresql,
  SiGooglegemini,
  SiClaude,
  SiPython,
} from "react-icons/si";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Each entry renders as a branded icon + label in the skills grid.
// color matches the technology's official brand colour so the icons look recognisable.
// filter (optional) is the exact tech tag used by the Projects page filter bar — when set,
// the skill becomes a clickable link to /projects with that filter pre-applied.
const SKILLS = [
  { icon: SiHtml5, label: "HTML5", color: "#e34f26" },
  { icon: SiCss3, label: "CSS3", color: "#1572b6" },
  { icon: SiJavascript, label: "JavaScript", color: "#f7df1e", filter: "JavaScript" },
  { icon: SiReact, label: "ReactJS", color: "#61dafb" },
  { icon: SiNextdotjs, label: "Next.js", color: "#000000", filter: "Next.js" },
  { icon: SiTailwindcss, label: "Tailwind", color: "#38bdf8", filter: "Tailwind CSS" },
  { icon: SiJquery, label: "jQuery", color: "#0769ad", filter: "jQuery" },
  { icon: SiBootstrap, label: "Bootstrap", color: "#7952b3" },
  { icon: SiWordpress, label: "WordPress", color: "#21759b", filter: "WordPress" },
  { icon: SiSanity, label: "Sanity", color: "#f03e2f", filter: "Sanity" },
  { icon: SiPhp, label: "PHP", color: "#777bb4", filter: "PHP" },
  { icon: SiMysql, label: "mySQL", color: "#4479a1" },
  { icon: SiPostgresql, label: "Postgres", color: "#4169e1", filter: "Postgres" },
  { icon: SiGooglegemini, label: "Gemini", color: "#8e75b2", filter: "Gemini" },
  { icon: SiClaude, label: "Claude Code", color: "#d97757", filter: "Claude Code" },
  { icon: SiPython, label: "Python", color: "#3776ab", filter: "Python" },
];

// Rendered as a vertical timeline — most recent entry first.
// href links to the company website (opens in a new tab).
const EXPERIENCE = [
  {
    period: "Jul 2025 — Jun 2026",
    role: "Full Stack Developer",
    company: "Elite Digital",
    href: "https://elitedigitalagency.com/",
    location: "Ontario, Canada",
    description:
      "Professional software experience as a Full Stack Developer, working with Claude Code, Sanity, JavaScript, Wordpess, site performance, Codex, Supabase, PHP, MySQL, WordPress, CSS, Shopify, Next.js, Tailwind CSS. Responsibilities: maintenance of the existing codebase, communication with the customer, some architecture decisions, requirements analysis, new feature delivery, bug fixing, updating documentation, and code review.",
  },
  {
    period: "Jan 2023 — Jan 2024",
    role: "Frontend Developer",
    company: "Elite Digital",
    href: "https://elitedigitalagency.com/",
    location: "Ontario, Canada",
    description:
      "Professional software experience as a Frontend Developer, working with Jekyll, Sanity, React.js, Next.js, JavaScript, Liquid Template Language, Elementor, SASS, WordPress, Docker. Responsibilities: maintenance of the existing codebase, requirements analysis, new feature delivery, bug fixing, updating documentation, and code review.",
  },
  {
    period: "Jan 2013 — May 2016",
    role: "Frontend Developer",
    company: "SoftServe",
    href: "https://www.softserveinc.com",
    location: "Dnipro, Ukraine",
    description:
      "3+ years of professional software experience as a Frontend Developer (JavaScript, HTML, CSS, Bootstrap, Backbone.js). Responsibilities: maintenance of the existing codebase, requirements analysis, communication with the customer, new feature delivery, bug fixing, updating documentation, and code review.",
  },
  {
    period: "2011 — 2013",
    role: "Teacher C++",
    company: "IT Academy \"Step\"",
    href: "https://itstep.org",
    location: "Dnipro, Ukraine",
    description:
      "Taught the basics of C++ to kids aged 10-14, covering topics like variables, functions, operators, data types, and simple algorithms such as bubble sort and factorial.",
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
            alt="Portrait of Yana Krukovets, Full Stack Developer"
          />
        </div>
        <div className="max-w-[65%] md:max-w-full md:mt-[10px]">
          <h3 className="pb-[10px] text-[20px]">
            <b>Who am I?</b>
          </h3>
          <p>
            My name is Yana Krukovets. I&rsquo;m a Full Stack and Frontend
            Developer based in Ottawa, Canada, with 5+ years of professional
            experience. I like to code things from scratch and enjoy bringing
            ideas to life in the browser.
          </p>
          <p className="mt-[12px]">
            I love turning ideas into products people actually enjoy using.
            My passion has always been creating fast, intuitive, and
            accessible user experiences that feel great to use.
          </p>
          <p className="mt-[12px]">
            Over the years, I&rsquo;ve worked with technologies such as
            React, Next.js, JavaScript, Tailwind CSS, Node.js, Backbone.js,
            have experience teaching the basics C++ to kids. I&rsquo;ve collaborated with Agile teams throughout
            the full software development lifecycle, helping build and
            maintain applications using both MVC and MVVM architectures.
          </p>
          <p className="mt-[12px]">
            Lately, I&rsquo;ve been exploring Python and AI. I use
            AI-assisted development tools in my daily workflow to automate
            repetitive tasks, improve productivity, and focus more time on
            solving real problems. At the same time, I&rsquo;m fascinated by
            how AI systems work behind the scenes and enjoy learning about
            machine learning, model training, and emerging technologies —
            check out my{" "}
            <Link href="/blog" className="underline">
              latest blog posts
            </Link>{" "}
            if you want to go deeper with me there.
          </p>
          <p className="mt-[12px]">
            I&rsquo;m always excited by opportunities to learn, build, and
            collaborate. Whether it&rsquo;s a freelance project, contract
            role, or full-time position, I enjoy working with teams that
            care about creating thoughtful products and great user
            experiences.
          </p>

          {/* Hobbies */}
          <div className="mt-[20px]">
            <p>
              When I&rsquo;m not coding, you&rsquo;ll usually find me
              hiking, biking, skiing, skating, painting, watching a great
              film, or spending time with my family. I believe maintaining a
              balance between work and life helps me stay creative,
              motivated, and continually inspired.
            </p>
          </div>

          <p className="mt-[20px]">
            If you&rsquo;d like to work together or simply connect,
            I&rsquo;d love to hear from you.
          </p>

          {/* Resume download — the `download` attribute tells the browser to save the file
              rather than open it; aria-label makes the purpose clear to screen readers */}
          <div className="mt-[20px]">
            <a
              href="/Yana_Krukovets_CV.pdf"
              download
              className="btn inline-flex items-center gap-[8px] mt-[10px]"
              aria-label="Download Yana Krukovets resume"
              onClick={() => trackConversion("cv_downloaded", { path: window.location.pathname })}
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
          {SKILLS.map(({ icon: Icon, label, color, filter }) => {
            const inner = (
              <>
                {/* aria-hidden because the label below already describes the icon */}
                <Icon className="skill-icon" style={{ color }} aria-hidden="true" />
                <span className="skill-label">{label}</span>
              </>
            );
            // Skills with a matching project filter link to the Projects page with that
            // filter pre-applied; the rest stay as plain (non-clickable) cards.
            return filter ? (
              <Link
                key={label}
                href={{ pathname: "/projects", query: { filter } }}
                className="skill-item skill-item--link"
                aria-label={`View ${label} projects`}
              >
                {inner}
              </Link>
            ) : (
              <div key={label} className="skill-item">
                {inner}
              </div>
            );
          })}
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
                    rel="noreferrer"
                    aria-label={`${item.company} (opens in new tab)`}
                  >
                    <i>{item.company}</i>
                  </a>
                </p>
                <span className="timeline-location">{item.location}</span>
                {item.description && (
                  <p className="timeline-description">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social links — GitHub and LinkedIn icons from react-icons */}
      <div
        ref={socialRef}
        className={`flex justify-center py-[10px] mt-[20px] social-links reveal${socialVisible ? " reveal--visible" : ""}`}
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
        <Link href="/contact" aria-label="Link to Yana Krukovets contact page">
          <AiOutlineMail className="social-media" role="presentation" />
        </Link>
      </div>
    </div>
  );
};

export default About;
