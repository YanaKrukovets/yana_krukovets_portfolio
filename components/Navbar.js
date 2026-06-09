import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Nav link data — keeping it in an array avoids repeating the Link markup three times
// mobileClass lets individual items adjust their max-width on small screens
const NAV_ITEMS = [
  { label: "About",    aria: "Link About Yana Krukovets",         href: "/#about",    section: "about",    mobileClass: "max-w-[200px]" },
  { label: "Projects", aria: "Link to Yana Krukovets Projects",   href: "/projects",  section: "projects", mobileClass: "xmd:max-w-[240px]" },
  { label: "Contact",  aria: "Link to Contact Yana Krukovets",    href: "/contact",   section: "contact",  mobileClass: "" },
];

// Maps pathname to the active nav section
function getActiveSection(pathname) {
  if (pathname === "/projects") return "projects";
  if (pathname === "/contact") return "contact";
  return "about";
}

export default function Navbar() {
  const router = useRouter();
  // Controls whether the mobile fullscreen menu is shown
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);

  const activeSection = getActiveSection(router.pathname);

  // Lock page scroll when the mobile nav is open so the background doesn't scroll behind it.
  // The scrollY snapshot + restoration pattern prevents iOS from jumping to the top on close.
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
    // Fixed positioning keeps the nav visible while scrolling; z-10 keeps it above page content
    <div className="xxxl:px-0 fixed w-full z-10 left-0">
      <nav className="md:flex justify-between topnav mx-auto">
        <div className="flex justify-between content-wrapper w-full">

          {/* Logo — links back to the homepage */}
          <div className="flex justify-between">
            <div className="w-[60px] md:w-[50px]">
              <Link href="/" passHref aria-label="Go to homepage">
                <Image
                  src="/images/logos/logo-en.png"
                  className="w-full max-w-[60px] object-cover my-[15px]"
                  alt="YK - Yana Krukovets logo"
                  priority={true}  // above-the-fold image — load it immediately, don't lazy-load
                  width={250}
                  height={250}
                />
              </Link>
            </div>
          </div>

          {/* Desktop nav — hidden on mobile via CSS, shown above the md breakpoint */}
          <div className="desktop-nav">
            {NAV_ITEMS.map((item) => (
              <div key={item.section}>
                <Link
                  aria-label={item.aria}
                  href={item.href}
                  // nav-active adds the underline/highlight for the currently visible section
                  className={`${activeSection === item.section ? "nav-active" : ""} text-white menu-a`}
                >
                  <span className="whitespace-nowrap lg:whitespace-normal text-[20px] !flex flex-col xmd:inline-block">
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile nav — full-screen overlay, shown when hamburger is toggled */}
          <div id="mobile-nav" aria-hidden={!mobileNavExpanded} className={`mobile-nav ${mobileNavExpanded ? "block h-full" : ""}`}>
            {NAV_ITEMS.map((item) => (
              <div key={item.section}>
                <Link
                  href={item.href}
                  className="mobile-nav-item"
                  aria-label={item.aria}
                  tabIndex={mobileNavExpanded ? 0 : -1}
                  // Close the mobile menu when the user taps a link
                  onClick={() => setMobileNavExpanded(false)}
                >
                  <span className={`mobile-nav-text whitespace-nowrap lg:whitespace-normal text-[20px] ${item.mobileClass}`}>
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Hamburger — native <button> for proper keyboard/screen-reader support.
              aria-expanded and aria-controls wire it to the mobile nav for assistive tech. */}
          <div className="flex-end mt-[-9px]">
            <button
              type="button"
              id="nav-button"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileNavExpanded}
              aria-controls="mobile-nav"
              // "open" class triggers the CSS X animation (three spans become an X)
              className={`${mobileNavExpanded ? "open" : ""} nav-button`}
              onClick={() => setMobileNavExpanded(!mobileNavExpanded)}
            >
              {/* Three spans are the three lines of the hamburger icon */}
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>

        </div>
      </nav>
    </div>
  );
}
