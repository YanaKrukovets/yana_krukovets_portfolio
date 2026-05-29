import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const SECTIONS = ["about", "projects", "contact"];

const NAV_ITEMS = [
  {
    label: "<span class='whitespace-nowrap lg:whitespace-normal text-[20px]'>About</span>",
    aria: "Link About Yana Krukovets",
    href: "/#about",
    section: "about",
  },
  {
    label: "<span class='whitespace-nowrap lg:whitespace-normal text-[20px]'>Projects</span>",
    aria: "Link to Yana Krukovets Projects",
    href: "/#projects",
    section: "projects",
  },
  {
    label: "<span class='whitespace-nowrap lg:whitespace-normal text-[20px]'>Contact</span>",
    aria: "Link to Contact Yana Krukovets",
    href: "/#contact",
    section: "contact",
  },
];

export default function Navbar() {
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dropdown = useRef(null);

  // IntersectionObserver — track which section is in view
  useEffect(() => {
    const observers = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile nav open
  useEffect(() => {
    if (mobileNavExpanded) {
      document.body.style.position = "fixed";
      return () => { document.body.style.position = "relative"; };
    }
    return () => { document.body.style.position = "relative"; };
  }, [mobileNavExpanded]);

  return (
    <>
      <div className="xxxl:px-0 fixed w-full z-10 left-0">
        <nav className="md:flex justify-between topnav mx-auto">
          <div className="flex justify-between content-wrapper w-full">

            {/* Logo */}
            <div className="flex justify-between">
              <div className="w-[60px] md:w-[50px]">
                <Link href="/" passHref>
                  <Image
                    src="/images/logos/logo-en.png"
                    className="w-full max-w-[60px] object-cover my-[15px]"
                    alt="YK - Yana Krukovets logo"
                    priority={true}
                    width={250}
                    height={250}
                  />
                </Link>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="desktop-nav">
              {NAV_ITEMS.map((item, index) => (
                <div key={index}>
                  <Link
                    aria-label={item.aria}
                    href={item.href}
                    className={`${activeSection === item.section ? "nav-active" : ""} text-white hover:underline menu-a`}
                  >
                    <span
                      className="!flex flex-col xmd:inline-block"
                      dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Nav */}
            <div
              className={`mobile-nav ${mobileNavExpanded ? "block h-full" : ""}`}
            >
              {NAV_ITEMS.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.href}
                    className="mobile-nav-item"
                    aria-label={item.aria}
                    onClick={() => setMobileNavExpanded(false)}
                  >
                    <span
                      className={`mobile-nav-text ${
                        index === 0 ? "max-w-[200px]" : index === 1 ? "xmd:max-w-[240px]" : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                  </Link>
                </div>
              ))}
            </div>

            {/* Hamburger */}
            <div className="flex-end mt-[-9px]">
              <a
                role="button"
                ref={dropdown}
                id="nav-button"
                aria-label="mobile menu"
                aria-expanded={mobileNavExpanded}
                className={`${mobileNavExpanded ? "open" : ""} nav-button`}
                onClick={() => setMobileNavExpanded(!mobileNavExpanded)}
              >
                <span></span>
                <span></span>
                <span></span>
              </a>
            </div>

          </div>
        </nav>
      </div>
    </>
  );
}
