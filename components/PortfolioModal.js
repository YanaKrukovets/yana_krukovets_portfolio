import ProjectModal from "./ProjectModal";

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

const TABS = [
  {
    label: "Tech Stack",
    content: (
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
    ),
  },
  {
    label: "Architecture",
    content: (
      <div className="portfolio-modal__claude">
        <div className="portfolio-modal__claude-section">
          <h4 className="portfolio-modal__claude-heading">Typewriter Animation</h4>
          <p className="portfolio-modal__claude-text">
            The hero banner cycles through four roles using a custom <code className="portfolio-modal__inline-code">useTypewriter</code> hook —
            types each character one by one, pauses, deletes, then moves to the next:
          </p>
          <div className="portfolio-modal__tag-row">
            {["Front-End Developer", "Full Stack Developer", "Next.js Developer", "UI Developer"].map((r) => (
              <span key={r} className="portfolio-modal__tag">{r}</span>
            ))}
          </div>
        </div>

        <div className="portfolio-modal__claude-section">
          <h4 className="portfolio-modal__claude-heading">Chat Widget</h4>
          <p className="portfolio-modal__claude-text">
            Floating AI assistant in the bottom-right corner (homepage only). Full request flow:
          </p>
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
            <li>System prompt includes Yana&apos;s full bio, skills, experience, and projects</li>
            <li>4 suggested questions shown on first open</li>
            <li>Typing indicator (3-dot animation) while waiting for a reply</li>
          </ul>
        </div>

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
    ),
  },
];

const PortfolioModal = ({ onClose }) => (
  <ProjectModal
    title="This Portfolio — Under the Hood"
    tabs={TABS}
    onClose={onClose}
  />
);

export default PortfolioModal;
