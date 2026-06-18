import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Project from "./Project";
import PortfolioModal from "./PortfolioModal";
import AlifallxModal from "./AlifallxModal";
import FocusCopilotModal from "./FocusCopilotModal";
import { useScrollReveal } from "../hooks/useScrollReveal";
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

// Professional projects — work done at Elite Digital; shown below personal projects
const projectsWork = [
  {
    href: "https://sleeveclinic.ca/",
    src: "/images/components/projects/sleeve.png",
    alt: "Next.js website, custom analytics, AI, Canada",
    year: "2026",
    text: "Elite Digital Project",
    tech: "Next.js, Tailwind CSS, Calendly, Tidio",
  },
  {
    href: "https://www.eastpenncanada.com/",
    src: "/images/components/projects/eastpenn.png",
    alt: "Sanity Canada website",
    year: "2026",
    text: "Elite Digital Project",
    tech: "Next.js, Sanity, Tailwind CSS",
  },
  {
    href: "https://harmonyorganon.ca/",
    src: "/images/components/projects/harmony.png",
    alt: "WordPress multisite website",
    year: "2026",
    text: "Elite Digital Project",
    tech: "WordPress, JavaScript, jQuery, PHP",
  },
  {
    href: "https://unite.ca/",
    src: "/images/components/projects/unite.png",
    alt: "WordPress WordPress website",
    year: "2026",
    text: "Elite Digital Project",
    tech: "WordPress, PHP, WordPress",
  },
  {
    href: "https://vivalife.ca/",
    src: "/images/components/projects/viva.png",
    alt: "WordPress website",
    year: "2026",
    text: "Elite Digital Project",
    tech: "jQuery, WordPress, JavaScript, PHP",
  },
  {
    href: "https://firstfrontier.ca/",
    src: "/images/components/projects/firstfrontier.png",
    alt: "WordPress ACF website",
    year: "2025",
    text: "Elite Digital Project",
    tech: "WordPress, JavaScript, PHP, jQuery",
  },
  {
    href: "https://www.rexulti.ca/",
    src: "/images/components/projects/rexulti.png",
    alt: "Canada website, developer",
    year: "2025",
    text: "Elite Digital Project",
    tech: "Next.js, Tailwind CSS",
  },
  {
    href: "https://windsorarmshotel.com/",
    src: "/images/components/projects/windsor.png",
    alt: "Windsor Arms Hotel website",
    year: "2025",
    text: "Elite Digital Project",
    tech: "WordPress, WPBakery",
  },
  {
    href: "https://nudestix.ca/",
    src: "/images/components/projects/nudestix.png",
    alt: "Shopify beauty website",
    year: "2025",
    text: "Elite Digital Project",
    tech: "Shopify, Shopify Liquid, jQuery",
  },
  {
    href: "https://elitedigitalagency.com/health",
    src: "/images/components/projects/healthElite.jpg",
    alt: "Elite Digital Health website",
    year: "2023",
    text: "Elite Digital Project",
    tech: "Next.js, Tailwind CSS, Sass",
  },
  {
    href: "https://elitedigitalagency.com",
    src: "/images/components/projects/elite.jpg",
    alt: "Elite Digital website",
    year: "2023",
    text: "Elite Digital Project",
    tech: "Next.js, Tailwind CSS, Sass",
  },
  {
    href: "https://orijinsupport.ca/",
    src: "/images/components/projects/orijin.jpg",
    alt: "WordPress Multisite DIVI website",
    year: "2023",
    text: "Elite Digital Project",
    tech: "WordPress Multisite, Divi, JavaScript, PHP, CSS",
  },
  {
    href: "https://velphoro.orijinsupport.ca/",
    src: "/images/components/projects/velphoro.png",
    alt: "WordPress Multisite website",
    year: "2023",
    text: "Elite Digital Project",
    tech: "Divi, WordPress, PHP",
  },
  {
    href: "https://korsuva.orijinsupport.ca/",
    src: "/images/components/projects/korsuva.png",
    alt: "WordPress website",
    year: "2023",
    text: "Elite Digital Project",
    tech: "WordPress, Elementor",
  },
  {
    href: "https://bloombyorganon.ca",
    src: "/images/components/projects/bloom.jpg",
    alt: "Bloom website",
    year: "2023",
    text: "Elite Digital Project",
    tech: "WordPress Multisite, JavaScript, PHP, CSS",
  },
  {
    href: "https://bloombyorganon.ca/orgalutran/",
    src: "/images/components/projects/orgalutran.png",
    alt: "Orgalutran page on the Bloom by Organon website",
    year: "2023",
    text: "Elite Digital Project",
    tech: "WordPress, Elementor",
  },
  {
    href: "https://bloombyorganon.ca/pregnyl/",
    src: "/images/components/projects/pregnyl.png",
    alt: "Pregnyl page on the Bloom by Organon website",
    year: "2023",
    text: "Elite Digital Project",
    tech: "WordPress, Elementor",
  },
  {
    href: "https://kyleenaandmirena.ca/",
    src: "/images/components/projects/kyleena.png",
    alt: "Ckinic Finder website",
    year: "2023",
    text: "Elite Digital Project",
    tech: "Next.js, Tailwind CSS",
  },
];

// Personal projects — shown first in the section
const projects = [
  {
    href: "https://adhd-eight-umber.vercel.app/",
    src: "/images/components/projects/focuscopylot.png",
    alt: "FocusCopilot, an agentic executive-function assistant for adults with ADHD",
    text: "Personal Project",
    year: "2026",
    tech: "Next.js, React, Tailwind CSS, Postgres, Drizzle, Gemini",
    description: "An agentic executive-function assistant for adults with ADHD, focused on task initiation over task management.",
  },
  {
    href: "https://www.alifallx.com",
    src: "/images/components/projects/alifallx.jpg",
    alt: "Alifallx — a Next.js browser game",
    text: "Personal Project",
    year: "2026",
    tech: "Next.js, Tailwind CSS, SCSS, HTML5 Canvas, Framer Motion",
    description: "A browser-based game built with Next.js and a raw HTML5 Canvas game loop — no game library.",
  },
  {
    href: "https://yanaartgallery.vercel.app",
    src: "/images/components/projects/art-gallery.jpg",
    alt: "Yana Krukovets Art Gallery",
    text: "Personal Project",
    year: "2024",
    tech: "Next.js, Tailwind CSS, Sass",
    description: "Online art gallery showcasing original artworks with a CMS-driven catalog.",
  },
  {
    href: "https://www.yanakrukovets.com",
    src: "/images/components/projects/portfolio.jpg",
    alt: "Yana Krukovets portfolio website",
    year: "2024",
    text: "Personal Project",
    tech: "Next.js, Tailwind CSS, Sass",
    description: "This portfolio — built with Next.js, Tailwind CSS, and Sass.",
  },
  {
    href: "https://art-shop-zeta.vercel.app",
    src: "/images/components/projects/art-shop.jpg",
    alt: "Art shop website",
    year: "2023",
    text: "Personal Project",
    tech: "Next.js, Sanity, Stripe, HTML, CSS",
    description: "E-commerce art shop with Sanity CMS, Stripe payments, and a custom storefront.",
  },
];

// The portfolio card's href — used to detect which project card should show the "Under the hood" button
const PORTFOLIO_HREF = "https://www.yanakrukovets.com";
const ALIFALLX_HREF = "https://www.alifallx.com";
const FOCUSCOPILOT_HREF = "https://adhd-eight-umber.vercel.app/";

const FILTER_EXCLUDE = new Set(["CSS", "HTML", "Sass", "Calendly", "Tidio"]);

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
  const [isMobile, setIsMobile] = useState(false);

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

  // Keep isMobile in sync with the window width — runs on mount and on every resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

          {/* Technology filter bar */}
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
