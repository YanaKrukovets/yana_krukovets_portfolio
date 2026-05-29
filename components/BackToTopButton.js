import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top xxl:right-[20px]${isVisible ? " back-to-top--visible" : ""}`}
      aria-label="Back to top"
    >
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
