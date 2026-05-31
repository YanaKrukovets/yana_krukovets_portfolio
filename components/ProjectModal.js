import React, { useState, useEffect, useCallback } from "react";

// Generic project modal shell.
// Props:
//   title   — heading displayed in the modal header
//   tabs    — array of { label: string, content: ReactNode }
//   onClose — callback to hide the modal
const ProjectModal = ({ title, tabs, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const bodyRef = React.useRef(null);

  const handleKey = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [handleKey]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [activeTab]);

  return (
    <div
      className="portfolio-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="portfolio-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="portfolio-modal__header">
          <h3 className="portfolio-modal__title">{title}</h3>
          <button
            className="portfolio-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="portfolio-modal__tabs" role="tablist">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              role="tab"
              aria-selected={activeTab === i}
              className={`portfolio-modal__tab${activeTab === i ? " portfolio-modal__tab--active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="portfolio-modal__body" ref={bodyRef}>
          {tabs[activeTab]?.content}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
