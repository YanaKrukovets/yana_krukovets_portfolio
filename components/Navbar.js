import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const SECTIONS = ["about", "projects", "contact"];

const NAV_ITEMS = [
  { label: "About",    aria: "Link About Yana Krukovets",         href: "/#about",    section: "about",    mobileClass: "max-w-[200px]" },
  { label: "Projects", aria: "Link to Yana Krukovets Projects",   href: "/#projects", section: "projects", mobileClass: "xmd:max-w-[240px]" },
  { label: "Contact",  aria: "Link to Contact Yana Krukovets",    href: "/#contact",  section: "contact",  mobileClass: "" },
];

export default function Navbar() {
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dropdown = useRef(null);

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!mobileNavExpanded) return;
    // Save scroll position before locking — prevents iOS jumping to top
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [mobileNavExpanded]);

  return (
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
            {NAV_ITEMS.map((item) => (
              <div key={item.section}>
                <Link
                  aria-label={item.aria}
                  href={item.href}
                  className={`${activeSection === item.section ? "nav-active" : ""} text-white hover:underline menu-a`}
                >
                  <span className="whitespace-nowrap lg:whitespace-normal text-[20px] !flex flex-col xmd:inline-block">
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Nav */}
          <div className={`mobile-nav ${mobileNavExpanded ? "block h-full" : ""}`}>
            {NAV_ITEMS.map((item) => (
              <div key={item.section}>
                <Link
                  href={item.href}
                  className="mobile-nav-item"
                  aria-label={item.aria}
                  onClick={() => setMobileNavExpanded(false)}
                >
                  <span className={`mobile-nav-text whitespace-nowrap lg:whitespace-normal text-[20px] ${item.mobileClass}`}>
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Hamburger — native <button> for proper keyboard/screen-reader support */}
          <div className="flex-end mt-[-9px]">
            <button
              type="button"
              ref={dropdown}
              id="nav-button"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileNavExpanded}
              aria-controls="mobile-nav"
              className={`${mobileNavExpanded ? "open" : ""} nav-button`}
              onClick={() => setMobileNavExpanded(!mobileNavExpanded)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

        </div>
      </nav>
    </div>
  );
}
