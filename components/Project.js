import React from "react";
import Image from "next/image";
import { trackConversion } from "../lib/analytics";

// Single project card used in both the personal and work grids (and the Swiper carousel on mobile).
// Props:
//   href        — link to the live project (opens in new tab)
//   src         — image path relative to /public
//   alt         — accessible description of the screenshot
//   tech        — comma-separated tech stack string
//   text        — label shown top-left ("Personal Project" / "Elite Digital Project")
//   year        — displayed top-right
//   description — optional short summary below the label row
//   onDetails   — optional callback; when provided, renders the "Under the hood →" button
const Project = ({ href, src, alt, tech, text, year, description, onDetails }) => {
  return (
    <div>
      <div className="project-card">
        {/* Clicking the image opens the live site in a new tab */}
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${alt} — view live (opens in new tab)`}
          onClick={() =>
            trackConversion("project_link_clicked", {
              path: window.location.pathname,
              label: alt,
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
          {/* Label row: project type on the left, year on the right */}
          <div className="flex justify-between leading-[19px]">
            <p className="text">{text}</p>
            <p>{year}</p>
          </div>
          {/* description is optional — personal projects have it, work projects don't */}
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
