import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Project from "./Project";
import PortfolioModal from "./PortfolioModal";
import AlifallxModal from "./AlifallxModal";
import FocusCopilotModal from "./FocusCopilotModal";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useIsMobile } from "../hooks/useIsMobile";
import { projects, projectsWork } from "../lib/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Shared Swiper config — extracted so it isn't repeated for both personal and work carousels
const SWIPER_PROPS = {
  modules: [Pagination, Navigation, A11y],
  spaceBetween: 20,
  slidesPerView: 1,
  pagination: { clickable: true },  // dot navigation below the carousel
  navigation: true,                 // left/right arrow buttons
  className: "projects-swiper mt-[20px]",
};

// The portfolio card's href — used to detect which project card should show the "Under the hood" button
const PORTFOLIO_HREF = "https://www.yanakrukovets.com";
const ALIFALLX_HREF = "https://www.alifallx.com";
const FOCUSCOPILOT_HREF = "https://adhd-eight-umber.vercel.app/";

const FILTER_EXCLUDE = new Set(["CSS", "HTML", "Sass", "Calendly", "Tidio", "stable-baselines3 (PPO)"]);

// Derive sorted unique tech tags from all projects combined; "All" is always first
const ALL_TECHS = ["All", ...Array.from(
  new Set(
    [...projects, ...projectsWork]
      .flatMap((p) => p.tech.split(",").map((t) => t.trim()))
      .filter((t) => !FILTER_EXCLUDE.has(t))
  )
).sort()];

const matchesFilter = (project, filter) =>
  filter === "All" || project.tech.split(",").map((t) => t.trim()).includes(filter);

const Projects = () => {
  // Swaps between a CSS grid (desktop) and Swiper carousel (mobile ≤768px)
  const isMobile = useIsMobile();

  // Controls visibility of PortfolioModal — only one modal exists in the tree
  const [modalOpen, setModalOpen] = useState(false);

  // Controls visibility of AlifallxModal
  const [alifallxModalOpen, setAlifallxModalOpen] = useState(false);

  // Controls visibility of FocusCopilotModal
  const [focusCopilotModalOpen, setFocusCopilotModalOpen] = useState(false);

  // Active technology filter — "All" shows every project
  const [activeFilter, setActiveFilter] = useState("All");

  // Apply a filter passed via the URL query (e.g. a skill click on the About page links
  // to /projects?filter=Next.js); only honour values that are actually valid filter tags
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const { filter } = router.query;
    if (typeof filter === "string" && ALL_TECHS.includes(filter)) {
      setActiveFilter(filter);
    }
  }, [router.isReady, router.query]);

  // Separate scroll reveal refs so the title, personal grid, and work grid animate in independently
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal(0.1);
  const { ref: personalRef, isVisible: personalVisible } = useScrollReveal(0.1);
  const { ref: workRef, isVisible: workVisible } = useScrollReveal(0.1);

  const filteredPersonal = projects.filter((p) => matchesFilter(p, activeFilter));
  const filteredWork = projectsWork.filter((p) => matchesFilter(p, activeFilter));

  return (
    <>
    <div id="projects" className="purple py-[40px] font-roboto">
      <div className="content-wrapper pb-[20px] pt-[40px]">

        {/* Section header */}
        <div
          ref={titleRef}
          className={`reveal pt-[20px] ${titleVisible ? " reveal--visible" : ""}`}
        >
          <div className="projects-page-header">
            <span className="projects-page-header__label">Portfolio</span>
            <h1 className="projects-page-header__title">My Projects</h1>
            <div className="projects-page-header__line" />
          </div>

          {/* Technology filter — dropdown on mobile, button bar on desktop */}
          {isMobile ? (
            <div className="filter-select-wrap">
              <label htmlFor="project-filter" className="sr-only">
                Filter projects by technology
              </label>
              <select
                id="project-filter"
                className="filter-select"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                {ALL_TECHS.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech === "All" ? "All projects" : tech}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="filter-bar">
              {ALL_TECHS.map((tech) => (
                <button
                  key={tech}
                  className={`filter-btn${activeFilter === tech ? " filter-btn--active" : ""}`}
                  onClick={() => setActiveFilter(tech)}
                  aria-pressed={activeFilter === tech}
                  aria-label={tech === "All" ? "Show all projects" : `Filter projects by ${tech}`}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Personal projects — ref always in DOM so observer fires on initial scroll-into-view */}
        <div ref={personalRef}>
          {filteredPersonal.length > 0 && (
            <>
              <p className="projects-page-header__subtitle mb-[4px]">Personal projects</p>
              {isMobile ? (
                <Swiper {...SWIPER_PROPS}>
                  {filteredPersonal.map((project, index) => (
                    <SwiperSlide key={index}>
                      <Project
                        {...project}
                        onDetails={
                          project.href === PORTFOLIO_HREF ? () => setModalOpen(true) :
                          project.href === ALIFALLX_HREF ? () => setAlifallxModalOpen(true) :
                          project.href === FOCUSCOPILOT_HREF ? () => setFocusCopilotModalOpen(true) :
                          undefined
                        }
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="projects-container flex-disp mt-[20px]">
                  {filteredPersonal.map((project, index) => (
                    <div
                      key={index}
                      className={`reveal reveal--delay-${index + 1}${personalVisible ? " reveal--visible" : ""}`}
                    >
                      <Project
                        {...project}
                        onDetails={
                          project.href === PORTFOLIO_HREF ? () => setModalOpen(true) :
                          project.href === ALIFALLX_HREF ? () => setAlifallxModalOpen(true) :
                          project.href === FOCUSCOPILOT_HREF ? () => setFocusCopilotModalOpen(true) :
                          undefined
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Work projects — ref always in DOM so observer fires on initial scroll-into-view */}
        <div ref={workRef}>
          {filteredWork.length > 0 && (
            <>
              {filteredPersonal.length > 0 && <hr className="my-[20px]" />}
              <div className={`reveal${workVisible ? " reveal--visible" : ""}`}>
                <p className="mb-[8px]">Also I was a part of a team who was working on the next projects</p>
              </div>
              {isMobile ? (
                <Swiper {...SWIPER_PROPS}>
                  {filteredWork.map((project, index) => (
                    <SwiperSlide key={index}>
                      <Project {...project} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="projects-container flex-disp mt-[20px]">
                  {filteredWork.map((project, index) => (
                    <div
                      key={index}
                      className={`reveal reveal--delay-${index + 1}${workVisible ? " reveal--visible" : ""}`}
                    >
                      <Project {...project} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Empty state — shown when no projects match the active filter */}
        {filteredPersonal.length === 0 && filteredWork.length === 0 && (
          <p className="filter-empty">No projects found for &ldquo;{activeFilter}&rdquo;.</p>
        )}

      </div>
    </div>

    {/* Modal is mounted only when open — unmounting it resets internal scroll position */}
    {modalOpen && <PortfolioModal onClose={() => setModalOpen(false)} />}
    {alifallxModalOpen && <AlifallxModal onClose={() => setAlifallxModalOpen(false)} />}
    {focusCopilotModalOpen && <FocusCopilotModal onClose={() => setFocusCopilotModalOpen(false)} />}
    </>
  );
};

export default Projects;
