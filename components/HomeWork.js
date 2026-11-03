import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, projectsWork } from "../lib/projects";

// Homepage "Selected work" — picks projects by name from lib/projects.js.
// FEATURED gets the large card; MORE fill the grid below it. Rename here if a project is renamed.
const FEATURED = "Focus Copilot";
const MORE = ["Reward Tampering Gridworld", "AlifallX", "The Sleeve Clinic"];

const ALL = [...projects, ...projectsWork];
const byName = (name) => ALL.find((p) => p.name === name);
const techList = (tech, max) => tech.split(",").map((t) => t.trim()).slice(0, max);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export default function HomeWork() {
  const featured = byName(FEATURED);
  const more = MORE.map(byName).filter(Boolean);

  return (
    <section id="work" className="home-section home-container" aria-labelledby="work-heading">
      <div className="home-section__head">
        <div>
          <p className="home-eyebrow">01 · Selected work</p>
          <h2 id="work-heading" className="home-h2">Things I&rsquo;ve built</h2>
        </div>
        <Link className="home-link" href="/projects">
          All {ALL.length} projects <ArrowIcon />
        </Link>
      </div>

      {featured && (
        <a className="work-card work-card--featured" href={featured.href} target="_blank" rel="noopener noreferrer">
          <div className="work-card__media">
            <Image src={featured.src} alt={featured.alt} fill sizes="(max-width: 900px) 100vw, 700px" />
          </div>
          <div className="work-card__body">
            <p className="work-card__meta">{featured.text} · {featured.year} · Featured</p>
            <h3 className="work-card__title">{featured.name}</h3>
            <p className="work-card__desc">{featured.description}</p>
            <ul className="work-card__tags" aria-label="Tech stack">
              {techList(featured.tech, 5).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <span className="work-card__cta">
              Open live project <ArrowIcon />
            </span>
          </div>
        </a>
      )}

      <div className="work-grid">
        {more.map((p) => (
          <a key={p.name} className="work-card" href={p.href} target="_blank" rel="noopener noreferrer">
            <div className="work-card__media">
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 380px" />
            </div>
            <div className="work-card__body">
              <p className="work-card__meta">{p.text} · {p.year}</p>
              <h3 className="work-card__title">{p.name}</h3>
              <p className="work-card__desc">{p.description}</p>
              <p className="work-card__stack">{techList(p.tech, 4).join(" · ")}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
