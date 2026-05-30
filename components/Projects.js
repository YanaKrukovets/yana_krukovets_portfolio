import React, { useEffect, useState } from "react";
import Project from "./Project";
import PortfolioModal from "./PortfolioModal";
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
    alt: "Orijin website",
    year: "2023",
    text: "Elite Digital Project",
    tech: "WordPress, PHP, CSS",
  },
  {
    href: "https://bloombyorganon.ca",
    src: "/images/components/projects/bloom.jpg",
    alt: "Bloom website",
    year: "2023",
    text: "Elite Digital Project",
    tech: "WordPress, PHP, CSS",
  },
];

// Personal projects — shown first in the section
const projects = [
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

const Projects = () => {
  // Swaps between a CSS grid (desktop) and Swiper carousel (mobile ≤768px)
  const [isMobile, setIsMobile] = useState(false);

  // Controls visibility of PortfolioModal — only one modal exists in the tree
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <>
    <div id="projects" className="purple py-[40px] font-roboto">
      <div className="content-wrapper py-[20px]">

        {/* Section title — animates in when it enters the viewport */}
        <div
          ref={titleRef}
          className={`reveal${titleVisible ? " reveal--visible" : ""}`}
        >
          <h2 className="pb-[10px] text-[27px]">
            <b>Projects</b>
          </h2>
          <p>A small gallery of my recent projects</p>
        </div>

        {/* Personal projects — grid on desktop, Swiper carousel on mobile */}
        <div
          ref={personalRef}
          className={`reveal${personalVisible ? " reveal--visible" : ""}`}
        >
          {isMobile ? (
            <Swiper {...SWIPER_PROPS}>
              {projects.map((project, index) => (
                <SwiperSlide key={index}>
                  <Project
                    {...project}
                    // Only the portfolio card gets the "Under the hood" button —
                    // we match by href so no extra flag is needed in the data
                    onDetails={project.href === PORTFOLIO_HREF ? () => setModalOpen(true) : undefined}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="projects-container flex-disp mt-[20px]">
              {projects.map((project, index) => (
                <Project
                  key={index}
                  {...project}
                  onDetails={project.href === PORTFOLIO_HREF ? () => setModalOpen(true) : undefined}
                />
              ))}
            </div>
          )}
        </div>

        <hr className="my-[20px]" />

        {/* Work projects — same layout logic as personal projects above */}
        <div
          ref={workRef}
          className={`reveal${workVisible ? " reveal--visible" : ""}`}
        >
          <p className="mb-[8px]">Also I was a part of a team who was working on the next projects</p>
          {isMobile ? (
            <Swiper {...SWIPER_PROPS}>
              {projectsWork.map((project, index) => (
                <SwiperSlide key={index}>
                  <Project {...project} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="projects-container flex-disp mt-[20px]">
              {projectsWork.map((project, index) => (
                <Project key={index} {...project} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>

    {/* Modal is mounted only when open — unmounting it resets internal scroll position */}
    {modalOpen && <PortfolioModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default Projects;
