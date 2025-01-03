import React from "react";
import Image from "next/image";
import Project from "./Project";

const Projects = () => {
  return (
    <div id="projects" className="purple py-[40px] font-roboto">
      <div className="max-w-wrapper px-5 mx-auto py-[20px]">
        <h2 className="pb-[10px] text-[27px]">
          <b>Projects</b>
        </h2>
        <p>A small gallery of my recent projects</p>
        <div className="projects-container flex-disp">
          <Project
            href="https://art-shop-zeta.vercel.app"
            src="/images/artShop.jpg"
            alt="Art shop website"
            tech="ReactJS, Next.js, Sanity, Stripe, HTML, CSS"
          />
          <Project
            href="https://memorygame.rf.gd"
            src="/images/memory.jpg"
            alt="Memory game website"
            tech="JavaScript, HTML, CSS"
          />
          <Project
            href="https://meal-iota.vercel.app/"
            src="/images/meal.jpg"
            alt="Meal search website"
            tech="Vue.js, Vuex, Vite, Tailwind.css"
          />
          <Project
            href="https://reactfilm.vercel.app/"
            src="/images/movie.jpg"
            alt="Movie search website"
            tech="ReactJS, Tailwind.css"
          />
          <Project
            href="https://google-search-ashy.vercel.app/search"
            src="/images/Google.jpg"
            alt="Search website"
            tech="ReactJS, Tailwind.css, Rapid API"
          />
          <Project
            href="https://superquiz.great-site.net"
            src="/images/quiz.jpg"
            alt="Quiz website"
            tech="JavaScript, HTML, CSS"
          />
          <Project
            href="https://blog-next-graph-ql.vercel.app/"
            src="/images/blog.jpg"
            alt="Search website"
            tech="ReactJS, Next.js, GRaphQL, Hygraph cms"
          />
          <Project
            href="https://doughnut.epizy.com"
            src="/images/donuts.jpg"
            alt="Doughnuts website"
            tech="JavaScript, PHP, CSS, HTML, Bootstrap"
          />
        </div>
        <p>
          Also I was a part of a big team who was working on the &quot;Dentrix
          Ascend&quot; system (Dental Software)
        </p>
        <div className="projects-container">
          <Project
            href="https://www.dentrixascend.com"
            src="/images/dentrix.jpg"
            alt="Dentrix Ascend"
            tech="HTML, Bootstrap, Backbone.js"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
