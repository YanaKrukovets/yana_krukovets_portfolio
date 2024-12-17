import React from "react";
import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

const About = () => {
  return (
    <div id="about" className="about max-w-wrapper px-5 mx-auto font-roboto">
      <div className="flex justify-between gap-2 pt-[20px] md:pt-[0px] md:flex-col max-w-[1000px] mx-auto">
        <div className="my-auto">
          <Image
            className="profile-img"
            src="/images/components/about/yana_krukovets.jpg"
            height={270}
            width={270}
            alt="Yana Krukovets photo"
          />
        </div>
        <div className="max-w-[65%] md:max-w-full md:mt-[10px]">
          <h3 className="pb-[10px] text-[20px]">
            <b>Who am I?</b>
          </h3>
          <p>
            My name is Yana. I am a Front-End Developer based in Ottawa, Canada.
            I like to code things from scratch and enjoy bringing ideas to life
            in the browser.
          </p>

          <h3 className="pb-[10px] pt-[20px] text-[20px]">
            <b>Skills</b>
          </h3>
          <p>
            HTML, CSS, JavaScript, ReactJS, Next.js, Tailwind.css, jQuery,
            Bootstrap, Wordpress, PHP, mySQL
          </p>

          <h3 className="pb-[10px] pt-[20px] text-[20px]">
            <b>Experience</b>
          </h3>
          <p>
            <b>Jan 2023 - Jan 2024:</b> Frontend Developer at{" "}
            <a
              href="https://elitedigitalagency.com/"
              className="underline"
              target="_blanc"
            >
              <i>Elite Digital</i>
            </a>{" "}
            Toronto, Canada
          </p>
          <p>
            <b>Jan 2013 - May 2016:</b> Frontend Developer at{" "}
            <a
              href="https://www.softserveinc.com"
              className="underline"
              target="_blanc"
            >
              <i>SoftServe</i>
            </a>{" "}
            Dnipro, Ukraine
          </p>
          <p>
            <b>2011 - 2013:</b> Teacher C++ at{" "}
            <a href="https://itstep.org" className="underline" target="_blanc">
              <i>IT Academy &quot;Step&quot;</i>
            </a>{" "}
            Dnipro, Ukraine
          </p>
        </div>
      </div>
      <div className="flex justify-center py-[10px] mt-[20px] social">
        <a href="https://github.com/YanaKrukovets" target="_blanc">
          <AiFillGithub className="social-media" />
        </a>
        <a
          href="https://www.linkedin.com/in/yana-krukovets-25658260/"
          target="_blanc"
        >
          <AiFillLinkedin className="social-media" />
        </a>
      </div>
    </div>
  );
};

export default About;
