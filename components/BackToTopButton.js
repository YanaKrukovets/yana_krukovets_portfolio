import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

// Fixed button in the bottom-right corner that smoothly scrolls the page back to the top.
// Hidden below 300px scroll depth so it doesn't crowd the hero section.
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // { passive: true } tells the browser this listener never calls preventDefault —
    // allows the browser to optimise scroll performance (no need to wait for JS before painting)
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // back-to-top--visible toggles the CSS opacity/pointer-events so the button fades in/out
    <button
      onClick={scrollToTop}
      className={`back-to-top xxl:right-[20px]${isVisible ? " back-to-top--visible" : ""}`}
      aria-label="Back to top"
    >
      {/* role="presentation" because the parent button already has an aria-label */}
      <FontAwesomeIcon
        className="w-4 inline mt-[-1px]"
        icon={faAngleUp}
        color="#090a0f"
        role="presentation"
      />
    </button>
  );
};

export default BackToTopButton;
