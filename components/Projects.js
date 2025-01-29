import React from "react";

import Project from "./Project";

const Projects = () => {
  const projectsWork = [
    {
      href: "https://bloombyorganon.ca",
      src: "/images/components/projects/bloom.jpg",
      alt: "Yana Krukovets portfolio website",
      year: "2023",
      text: "Elite Digital Project",
      tech: "Wordpress",
    },
    {
      href: "https://www.dentrixascend.com",
      src: "/images/components/projects/dentrix.jpg",
      alt: "Dentrix Ascend",
      text: "Henry Schein Project",
      year: "2016",
      tech: "Bootstrap, Backbone.js, Sass",
    },
  ];
  const projects = [
    {
      href: "https://www.yanakrukovets-artgallery.com",
      src: "/images/components/projects/art-gallery.jpg",
      alt: "Dentrix Ascend",
      text: "Personal Project",
      year: "2024",
      tech: "Next.js, tailwindcss, Sass",
    },
    {
      href: "https://www.yanakrukovets-artgallery.com",
      src: "/images/components/projects/portfolio.jpg",
      alt: "Yana Krukovets portfolio website",
      year: "2024",
      text: "Personal Project",
      tech: "Next.js, tailwindcss, Sass",
    },
    {
      href: "https://art-shop-zeta.vercel.app",
      src: "/images/components/projects/art-shop.jpg",
      alt: "Art shop website",
      year: "2022",
      text: "Personal Project",
      tech: "Next.js, Sanity, Stripe, HTML, CSS",
    },
  ];

  return (
    <div id="projects" className="purple py-[40px] font-roboto">
      <div className="max-w-wrapper px-5 mx-auto py-[20px]">
        <h2 className="pb-[10px] text-[27px]">
          <b>Projects</b>
        </h2>
        <p>A small gallery of my recent projects</p>
        <div className="projects-container flex-disp">
          {projects.map((project, index) => {
            return (
              <Project
                key={index}
                href={project.href}
                src={project.src}
                alt={project.alt}
                text={project.text}
                tech={project.tech}
                year={project.year}
              />
            );
          })}
        </div>
        <p>
          Also I was a part of a big team who was working on the &quot;Dentrix
          Ascend&quot; system (Dental Software)
        </p>

        <div className="projects-container flex-disp">
          {projectsWork.map((project, index) => {
            return (
              <Project
                key={index}
                href={project.href}
                src={project.src}
                alt={project.alt}
                text={project.text}
                tech={project.tech}
                year={project.year}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
