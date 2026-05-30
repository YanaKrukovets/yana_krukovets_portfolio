import React, { useEffect, useState } from "react";
import Project from "./Project";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SWIPER_PROPS = {
  modules: [Pagination, Navigation, A11y],
  spaceBetween: 20,
  slidesPerView: 1,
  pagination: { clickable: true },
  navigation: true,
  className: "projects-swiper mt-[20px]",
};

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

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal(0.1);
  const { ref: personalRef, isVisible: personalVisible } = useScrollReveal(0.1);
  const { ref: workRef, isVisible: workVisible } = useScrollReveal(0.1);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div id="projects" className="purple py-[40px] font-roboto">
      <div className="content-wrapper py-[20px]">

        {/* Section title */}
        <div
          ref={titleRef}
          className={`reveal${titleVisible ? " reveal--visible" : ""}`}
        >
          <h2 className="pb-[10px] text-[27px]">
            <b>Projects</b>
          </h2>
          <p>A small gallery of my recent projects</p>
        </div>

        {/* Personal projects */}
        <div
          ref={personalRef}
          className={`reveal${personalVisible ? " reveal--visible" : ""}`}
        >
          {isMobile ? (
            <Swiper {...SWIPER_PROPS}>
              {projects.map((project, index) => (
                <SwiperSlide key={index}>
                  <Project {...project} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="projects-container flex-disp mt-[20px]">
              {projects.map((project, index) => (
                <Project key={index} {...project} />
              ))}
            </div>
          )}
        </div>

        <hr className="my-[20px]" />

        {/* Work projects */}
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
  );
};

export default Projects;
