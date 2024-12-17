import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const showLinks = (event) => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  };

  // Scroll smoothly to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll to top
    });
  };

  return (
    <div className="max-w-inner xxxl:px-0">
      <nav>
        <div className="topnav fixed w-full left-0" id="myTopnav">
          <div className="max-w-wrapper px-5 mx-auto">
            <div className="header-right">
              <button
                type="button"
                className="icon"
                onClick={(event) => showLinks(event)}
              >
                <GiHamburgerMenu />
              </button>
              <Link href="#" onClick={scrollToTop}>
                <Image
                  className="max-w-[40px]"
                  src="/images/logos/logo-en.png"
                  alt="YK - Yana Krukovets logo"
                  width={250}
                  height={250}
                />
              </Link>
              <Link href="#about">About</Link>
              <Link href="#projects">Projects</Link>
              <Link href="#contact">Contact</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
