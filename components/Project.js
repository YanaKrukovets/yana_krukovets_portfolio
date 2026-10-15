import React from "react";
import Image from "next/image";
import { trackConversion } from "../lib/analytics";

// Single project card used in both the personal and work grids (and the Swiper carousel on mobile).
// Props:
//   name        — project name, shown as the card heading
//   href        — link to the live project (opens in new tab)
//   src         — image path relative to /public
//   alt         — accessible description of the screenshot
//   tech        — comma-separated tech stack string
//   text        — label shown top-left ("Personal Project" / "Elite Digital Project")
//   year        — displayed top-right
//   description — short summary below the label row
//   onDetails   — optional callback; when provided, renders the "Under the hood →" button
const Project = ({ name, href, src, alt, tech, text, year, description, onDetails }) => {
  return (
    <div>
      <div className="project-card">
        {/* Clicking the image opens the live site in a new tab */}
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} — view live (opens in new tab)`}
          onClick={() =>
            trackConversion("project_link_clicked", {
              path: window.location.pathname,
              label: name,
            })
          }
        >
          <div className="imageContainer">
            <Image
              src={src}
              alt={alt}
              height={230}
              width={330}
              className="image"
            />
            {/* Hover overlay — CSS in _projects.scss fades this in on imageContainer:hover */}
            <div className="overlay mt-7">
              <p>
                <b>VIEW</b>
              </p>
            </div>
          </div>
        </a>
        <div className="px-[10px] pt-4">
          {/* Real text heading — the project name must not live only in the screenshot,
              or crawlers and AI assistants can't tell which project a card describes */}
          <h2 className="project-name">{name}</h2>
          {/* Label row: project type on the left, year on the right */}
          <div className="flex justify-between leading-[19px]">
            <p className="text">{text}</p>
            <p>{year}</p>
          </div>
          {description && (
            <p className="project-description">{description}</p>
          )}
          <p className="tech">
            <b>Technologies:</b> {tech}
          </p>
          {/* "Under the hood" button — only rendered for the portfolio card (onDetails is passed from Projects.js) */}
          {onDetails && (
            <button className="project-details-link" onClick={onDetails}>
              Under the hood →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
