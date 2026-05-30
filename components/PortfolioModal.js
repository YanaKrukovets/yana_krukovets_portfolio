import React, { useState, useEffect, useCallback } from "react";

// Tab labels rendered in order — index is used as the activeTab value
const TABS = ["Tech Stack", "Architecture", "Claude Setup"];

// Static data for the Tech Stack tab — each entry becomes a list item with a name, role badge, and description
const TECH = [
  {
    name: "Next.js 15",
    role: "Framework",
    desc: "The core engine. Pages Router — each file in pages/ becomes a URL automatically. Also runs the /api/chat backend route inside the same project.",
  },
  {
    name: "JavaScript / JSX",
    role: "Language",
    desc: "All source files are .js. JSX is JavaScript with HTML-like syntax mixed in — React uses it to describe UI.",
  },
  {
    name: "Tailwind CSS",
    role: "Styling — layout & utilities",
    desc: "Utility classes written directly in JSX (flex, mt-[20px], text-white). JIT mode, max-width breakpoints (md = ≤768px and below, not above).",
  },
  {
    name: "SCSS",
    role: "Styling — complex & animations",
    desc: "Global partials per component (_about.scss, _chat.scss, etc.). Used for keyframe animations, hover glows, pseudo-elements. No CSS Modules.",
  },
  {
    name: "Google Gemini API",
    role: "AI Chat",
    desc: "Powers the floating chat widget. User messages go to /api/chat.js which calls Gemini with a system prompt describing Yana's bio, skills, and projects. Rate-limited to 10 req/IP/min.",
  },
  {
    name: "Formspree",
    role: "Contact Form",
    desc: "Form submissions go to Formspree. Email service for HTML & JavaScript forms",
  },
  {
    name: "Swiper",
    role: "Mobile Carousel",
    desc: "On screens ≤768px the projects grid becomes a touch-swipeable carousel with pagination dots and arrow navigation.",
  },
  {
    name: "Playwright",
    role: "Testing",
    desc: "47 end-to-end tests covering SEO tags, accessibility, responsiveness at 3 screen sizes, mobile nav, and content integrity. Auto-starts dev server before running.",
  },
  {
    name: "Vercel",
    role: "Deployment",
    desc: "Hosts the site with a global CDN. Auto-deploys on every git push. Manages environment variables (Gemini API key).",
  },
  {
    name: "Security Headers",
    role: "Security",
    desc: "Set in next.config.js for all routes: HSTS (2 years), X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, Referrer-Policy.",
  },
];

// Descriptions of the two custom React hooks used in the project — shown in the Architecture tab
const HOOKS = [
  {
    name: "useScrollReveal.js",
    desc: "Wraps IntersectionObserver — returns a ref and an isVisible boolean. Attach the ref to any element and isVisible flips true when it enters the viewport. Used on every section to trigger the CSS slide-in reveal animation.",
  },
  {
    name: "useTypewriter.js",
    desc: "Cycles through an array of strings with a typewriter effect — types each character one by one, pauses, then deletes and moves to the next. Powers the hero banner roles: Front-End Developer → Full Stack Developer → Next.js Developer → UI Developer.",
  },
];

// Explains the hybrid Tailwind + SCSS approach — kept as data so the UI renders it consistently with other lists
const STYLING = [
  { label: "Tailwind CSS (JIT)", detail: "Utility classes written directly in JSX. JIT mode generates only the classes actually used, keeping the CSS bundle tiny." },
  { label: "SCSS partials", detail: "One partial per component (_about.scss, _chat.scss, _stars.scss…). Used for keyframe animations, hover glows, pseudo-elements, and media queries — anything awkward with utilities alone." },
  { label: "Global styles only", detail: "No CSS Modules. All SCSS is imported once in _app.js via styles.scss. No scoping, no hashes." },
  { label: "Inverted breakpoints", detail: "All Tailwind breakpoints are max-width based (md = ≤768px, sm = ≤576px…). 13 custom breakpoints from xxxl (2000px) down to xxxs (305px)." },
];

// Playwright test categories — each label maps to a group of tests in tests/portfolio.spec.js
const TEST_CATEGORIES = [
  { label: "SEO", detail: "title, meta description, OG/Twitter tags, h1, landmark elements" },
  { label: "Accessibility", detail: "skip link, alt text on all images, aria labels, form labels, hamburger button role" },
  { label: "Responsiveness", detail: "desktop (1440×900), tablet (768×1024), mobile (375×812)" },
  { label: "Mobile nav", detail: "hamburger open/close, Swiper carousel on project cards" },
  { label: "Desktop layout", detail: "projects grid, CTA buttons visible and clickable" },
  { label: "Content integrity", detail: "skills list, experience timeline, CV download link, typewriter animation" },
];

// Claude Code slash commands defined in .claude/commands/ — shown in the Claude Setup tab
const COMMANDS = [
  {
    name: "/update-content",
    desc: "Asks which section to update (bio, skills, experience, hobbies), then edits About.js directly and shows a diff.",
  },
  {
    name: "/add-project",
    desc: "Walks through 7 questions (URL, image, alt, label, tech, year, array), then adds the entry to Projects.js and reminds about the screenshot.",
  },
  {
    name: "/commit",
    desc: "Reads the staged git diff and generates a typed + scoped commit message (feat/update/fix, scope: projects/about/styles…) ready to paste.",
  },
  {
    name: "/sync-claude-md",
    desc: "Diffs the current branch against main, checks for structural changes (new/removed components, SCSS partials, dependencies, conventions), and updates CLAUDE.md only where needed.",
  },
];

// Modal that explains how this portfolio was built — opened from the Projects section
// onClose: callback to hide the modal (passed from the parent)
const PortfolioModal = ({ onClose }) => {
  // Tracks which tab is currently visible (0 = Tech Stack, 1 = Architecture, 2 = Claude Setup)
  const [activeTab, setActiveTab] = useState(0);

  // Ref to the scrollable content area — used to reset scroll position when switching tabs
  const bodyRef = React.useRef(null);

  // Memoized so the same function reference is passed to addEventListener/removeEventListener
  // Without useCallback a new function would be created on every render, causing the effect
  // to re-register the listener unnecessarily
  const handleKey = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    // Allow closing the modal by pressing Escape — a standard accessibility expectation for dialogs
    document.addEventListener("keydown", handleKey);

    // Lock page scroll while the modal is open so the background doesn't scroll behind it.
    // We snapshot scrollY first so we can restore the exact position on close — without this
    // the page would jump back to the top when the fixed positioning is removed.
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      // Cleanup: remove the keydown listener and restore scroll state when the modal unmounts
      document.removeEventListener("keydown", handleKey);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [handleKey]);

  // Reset the modal body scroll to the top whenever the user switches tabs,
  // so they always start reading from the beginning of the new tab's content
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [activeTab]);

  return (
    // Backdrop — clicking outside the modal panel closes it
    // role="dialog" + aria-modal="true" tell screen readers this is a modal dialog
    <div
      className="portfolio-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio project details"
    >
      {/* Modal panel — stopPropagation prevents backdrop's onClick from firing when clicking inside */}
      <div
        className="portfolio-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="portfolio-modal__header">
          <h3 className="portfolio-modal__title">This Portfolio — Under the Hood</h3>
          {/* Close button in the top-right corner — aria-label makes it accessible to screen readers */}
          <button
            className="portfolio-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            {/* X icon rendered as inline SVG — no image dependency, scales perfectly */}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Tab bar — role="tablist" groups the tabs for screen readers */}
        <div className="portfolio-modal__tabs" role="tablist">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === i}
              // Active tab gets an extra modifier class for the highlighted style
              className={`portfolio-modal__tab${activeTab === i ? " portfolio-modal__tab--active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable content area — ref lets useEffect reset scroll on tab change */}
        <div className="portfolio-modal__body" ref={bodyRef}>

          {/* Tab 0: Tech Stack — renders the TECH array as a list of technology cards */}
          {activeTab === 0 && (
            <ul className="portfolio-modal__tech-list">
              {TECH.map((item) => (
                <li key={item.name} className="portfolio-modal__tech-item">
                  <div className="portfolio-modal__tech-header">
                    <span className="portfolio-modal__tech-name">{item.name}</span>
                    <span className="portfolio-modal__tech-role">{item.role}</span>
                  </div>
                  <p className="portfolio-modal__tech-desc">{item.desc}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Tab 1: Architecture — explains key implementation details of the portfolio */}
          {activeTab === 1 && (
            <div className="portfolio-modal__claude">

              {/* Typewriter animation section */}
              <div className="portfolio-modal__claude-section">
                <h4 className="portfolio-modal__claude-heading">Typewriter Animation</h4>
                <p className="portfolio-modal__claude-text">
                  The hero banner cycles through four roles using a custom <code className="portfolio-modal__inline-code">useTypewriter</code> hook —
                  types each character one by one, pauses, deletes, then moves to the next:
                </p>
                {/* Tags showing each role the typewriter cycles through */}
                <div className="portfolio-modal__tag-row">
                  {["Front-End Developer", "Full Stack Developer", "Next.js Developer", "UI Developer"].map((r) => (
                    <span key={r} className="portfolio-modal__tag">{r}</span>
                  ))}
                </div>
              </div>

              {/* Chat widget section — explains the AI assistant and its request flow */}
              <div className="portfolio-modal__claude-section">
                <h4 className="portfolio-modal__claude-heading">Chat Widget</h4>
                <p className="portfolio-modal__claude-text">
                  Floating AI assistant in the bottom-right corner (homepage only). Full request flow:
                </p>
                {/* Visual flow diagram showing how a user message travels to Gemini and back */}
                <div className="portfolio-modal__flow">
                  <span className="portfolio-modal__flow-step">User message</span>
                  <span className="portfolio-modal__flow-arrow">→</span>
                  <span className="portfolio-modal__flow-step"><code className="portfolio-modal__inline-code">/api/chat</code></span>
                  <span className="portfolio-modal__flow-arrow">→</span>
                  <span className="portfolio-modal__flow-step">Google Gemini</span>
                  <span className="portfolio-modal__flow-arrow">→</span>
                  <span className="portfolio-modal__flow-step">Reply</span>
                </div>
                <ul className="portfolio-modal__bullet-list">
                  <li>In-memory rate limiter: 10 requests / IP / minute (resets on cold start)</li>
                  <li>System prompt includes Yana's full bio, skills, experience, and projects</li>
                  <li>4 suggested questions shown on first open</li>
                  <li>Typing indicator (3-dot animation) while waiting for a reply</li>
                </ul>
              </div>

              {/* Custom hooks section — renders the HOOKS array */}
              <div className="portfolio-modal__claude-section">
                <h4 className="portfolio-modal__claude-heading">Custom Hooks</h4>
                <ul className="portfolio-modal__cmd-list">
                  {HOOKS.map((hook) => (
                    <li key={hook.name} className="portfolio-modal__cmd-item">
                      <span className="portfolio-modal__cmd-name">{hook.name}</span>
                      <span className="portfolio-modal__cmd-desc">{hook.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* Tab 2: Claude Setup — explains how Claude Code is configured for this project */}
          {activeTab === 2 && (
            <div className="portfolio-modal__claude">

              {/* CLAUDE.md — the project context file that Claude reads automatically */}
              <div className="portfolio-modal__claude-section">
                <h4 className="portfolio-modal__claude-heading">CLAUDE.md</h4>
                <p className="portfolio-modal__claude-text">
                  A project context file checked into the repo and always injected into Claude's
                  context automatically. Documents the flat component structure, SCSS-not-CSS-Modules
                  rule, both project arrays, inactive components, i18n status, and known quirks —
                  so Claude doesn't have to re-derive them every conversation.
                </p>
              </div>

              {/* Custom slash commands — renders the COMMANDS array */}
              <div className="portfolio-modal__claude-section">
                <h4 className="portfolio-modal__claude-heading">Custom Commands</h4>
                <p className="portfolio-modal__claude-text portfolio-modal__claude-text--sub">
                  Slash commands stored in <code>.claude/commands/</code> — invoked on demand, scoped to this project.
                </p>
                <ul className="portfolio-modal__cmd-list">
                  {COMMANDS.map((cmd) => (
                    <li key={cmd.name} className="portfolio-modal__cmd-item">
                      <span className="portfolio-modal__cmd-name">{cmd.name}</span>
                      <span className="portfolio-modal__cmd-desc">{cmd.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills — passive reference docs Claude reads when relevant tasks come up */}
              <div className="portfolio-modal__claude-section">
                <h4 className="portfolio-modal__claude-heading">Skills</h4>
                <p className="portfolio-modal__claude-text portfolio-modal__claude-text--sub">
                  Stored in <code>.claude/skills/</code> — reference docs Claude reads passively.
                </p>
                <div className="portfolio-modal__cmd-item">
                  <span className="portfolio-modal__cmd-name">run-tests</span>
                  <span className="portfolio-modal__cmd-desc">
                    Documents the Playwright suite — what's covered, which files, and all run commands. Claude reads this when helping with tests.
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
