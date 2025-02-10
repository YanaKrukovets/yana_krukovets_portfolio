import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const showLinks = (event) => {
    var x = document.getElementById("myTopnav");
    if (x.classList.contains("responsive")) {
      x.classList.remove("responsive");
    } else {
      x.classList.add("responsive");
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
        <div className="topnav fixed w-full left-0 md:py-[15px]" id="myTopnav">
          <div className="max-w-wrapper px-5 mx-auto">
            <div className="header-right">
              <button
                type="button"
                className="icon text-white"
                onClick={(event) => showLinks(event)}
              >
                <GiHamburgerMenu />
              </button>
              <Link href="#" onClick={scrollToTop} className="ml-[-16px]">
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
