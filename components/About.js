import React from "react";
import Link from "next/link";

// Skills, grouped into the three cards in the About section.
// filter (optional) is the exact tech tag used by the Projects page filter bar — when set,
// the skill becomes a link to /projects with that filter pre-applied.
const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: [
      { label: "React" },
      { label: "Next.js", filter: "Next.js" },
      { label: "JavaScript", filter: "JavaScript" },
      { label: "Tailwind CSS", filter: "Tailwind CSS" },
      { label: "HTML5" },
      { label: "CSS3" },
      { label: "jQuery", filter: "jQuery" },
      { label: "Bootstrap" },
    ],
  },
  {
    title: "CMS and backend",
    items: [
      { label: "WordPress", filter: "WordPress" },
      { label: "Sanity", filter: "Sanity" },
      { label: "PHP", filter: "PHP" },
      { label: "MySQL" },
      { label: "Postgres", filter: "Postgres" },
      { label: "Docker" },
    ],
  },
  {
    title: "AI and other languages",
    items: [
      { label: "Claude Code", filter: "Claude Code" },
      { label: "Gemini", filter: "Gemini" },
      { label: "Python (basics)", filter: "Python" },
      { label: "C++ (basics)" },
    ],
  },
];

// Experience list — most recent entry first.
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
    period: "Jan 2020 — Dec 2021",
    role: "Independent iOS Developer",
    company: "Freelance",
    location: "Remote",
    description:
      "Designed, developed, and published three children's iOS applications on the Apple App Store, combining mobile development, interactive gameplay, and educational experiences. Built native iOS apps in Swift with interactive puzzles, animations, touch interactions, and game mechanics designed for young children. Managed development, testing, and App Store releases independently.",
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

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

// About (bio + skills) and Experience sections on the homepage
const About = () => (
  <>
    <section id="about" className="home-section home-container about-v2" aria-labelledby="about-heading">
      <div className="about-v2__bio">
        <p className="home-eyebrow">02 · About</p>
        <h2 id="about-heading" className="home-h2">Frontend at heart, full stack by trade</h2>
        <p>
          I&rsquo;m a full stack developer with a focus on the frontend, based in Ottawa,
          Canada, with 6+ years of professional experience. I like building things from
          scratch and making them feel fast, intuitive and accessible.
        </p>
        <p>
          I&rsquo;ve worked with React, Next.js, JavaScript, Tailwind CSS, Node.js and
          Backbone.js in Agile teams, using both MVC and MVVM architectures. I&rsquo;ve also
          published three children&rsquo;s iOS apps on the App Store and taught the basics of
          C++ to kids.
        </p>
        <p>
          Lately I&rsquo;ve been exploring Python and AI. I use AI tools every day to automate
          the repetitive parts of the job, and I write about my machine learning experiments
          on the <Link href="/blog" className="home-inline-link">blog</Link>.
        </p>
        <p className="about-v2__muted">
          Away from the keyboard: hiking, biking, skiing, skating, painting, a good film, and
          time with my family.
        </p>
        <div className="about-v2__links">
          <a className="home-link" href="https://github.com/YanaKrukovets" target="_blank" rel="noopener noreferrer">
            GitHub <ArrowIcon />
          </a>
          <a className="home-link" href="https://www.linkedin.com/in/yana-krukovets-25658260/" target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowIcon />
          </a>
          <Link className="home-link" href="/contact">
            Contact <ArrowIcon />
          </Link>
        </div>
      </div>

      <div className="about-v2__skills">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title} className="skill-group">
            <h3 className="skill-group__title">{group.title}</h3>
            <ul className="skill-group__list">
              {group.items.map(({ label, filter }) => (
                <li key={label}>
                  {filter ? (
                    <Link
                      href={{ pathname: "/projects", query: { filter } }}
                      className="skill-chip skill-chip--link"
                      aria-label={`View ${label} projects`}
                    >
                      {label}
                    </Link>
                  ) : (
                    <span className="skill-chip">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <section className="home-section home-container" aria-labelledby="exp-heading">
      <p className="home-eyebrow">03 · Experience</p>
      <h2 id="exp-heading" className="home-h2">Where I&rsquo;ve worked</h2>
      {/* Each row is a native <details>: the summary line shows by default, the description expands */}
      <div className="exp-list">
        {EXPERIENCE.map((item) => (
          <details key={`${item.period}-${item.role}`} className="exp-row">
            <summary>
              <span className="exp-row__period">{item.period}</span>
              <span className="exp-row__role">
                {item.role} <span className="exp-row__company">· {item.company}</span>
              </span>
              <span className="exp-row__location">{item.location}</span>
              <span className="exp-row__toggle" aria-hidden="true"></span>
            </summary>
            <div className="exp-row__body">
              <p>{item.description}</p>
              {item.href && (
                <a className="home-link" href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.company} website <ArrowIcon />
                </a>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  </>
);

export default About;
