import React from "react";
import Navbar from "./Navbar";
import { useTypewriter } from "../hooks/useTypewriter";

const ROLES = [
  "Front-End Developer",
  "Full Stack Developer",
  "Next.js Developer",
  "UI Developer",
];

const HeaderBanner = () => {
  const role = useTypewriter(ROLES);

  return (
    <>
      <Navbar />
      <div className="max-w-inner xxxl:px-0">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="content-wrapper">
          <div
            className="text-center font-roboto welcome md:mt-[40%]"
            id="welcome"
          >
            <h1 className="text-[40px] leading-[85px] md:text-[35px] md:leading-[60px] sm:text-[30px] sm:leading-[40px] md:mt-[30px]">
              Hello! My name is Yana Krukovets
            </h1>
            <h2 className="text-[25px] leading-[55px] min-h-[55px]">
              I am a{" "}
              <span className="typewriter-text">
                {role}
                <span className="typewriter-cursor" aria-hidden="true">|</span>
              </span>
            </h2>
            <h3 className="text-[20px] leading-[50px] md:text-[18px] md:leading-[30px]">
              Let&apos;s make a new life in the Network
            </h3>
            <div className="mt-[20px]">
              <a className="my-work-btn sm:my-[20px]" href="#projects">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Check my work
              </a>
              <a className="my-work-btn" href="mailto:krukovets.yana@gmail.com">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Contact me
              </a>
            </div>
          </div>
        </div>
        <a href="#about">
          <div className="container">
            <div className="field">
              <div className="scroll"></div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default HeaderBanner;
