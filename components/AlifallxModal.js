import ProjectModal from "./ProjectModal";

const TECH = [
  {
    name: "Next.js 15",
    role: "Framework",
    desc: "Runs the whole site. Pages Router — each file in pages/ becomes a URL (pages/game.js → /game). Handles routing, SSR, API routes, image optimization, and code splitting without extra config.",
  },
  {
    name: "Tailwind CSS",
    role: "Styling — layout & utilities",
    desc: "Utility classes written directly in JSX. No custom CSS needed for layout, spacing, or colors. Classes are tree-shaken at build time — only used classes ship to the browser.",
  },
  {
    name: "SCSS",
    role: "Styling — complex & animations",
    desc: "Used for component-specific styles that need reusable design tokens and animations too complex for Tailwind. Kept in styles/components/ and styles/pages/ per project conventions.",
  },
  {
    name: "HTML5 Canvas",
    role: "Game Engine",
    desc: "The entire game (pages/game.js) runs on a raw <canvas> element — no game library like Phaser or Unity. Gets a 2D drawing context, runs a game loop at 60fps (clear → update → draw → repeat), and handles collision detection, physics, and rendering from scratch.",
  },
  {
    name: "Framer Motion",
    role: "Animations",
    desc: "Powers smooth entrance animations, transitions between sections, and motion effects on the landing page. Replaces manual CSS keyframe animations with declarative React props: <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />",
  },
  {
    name: "Custom i18n",
    role: "Internationalization",
    desc: "No third-party library — plain JS objects with string keys in locales/en.js and locales/fr.js. The app reads the user's language preference and imports the matching locale file. All landing-page copy goes through these files; game HUD text lives directly in game.js.",
  },
  {
    name: "Formspree",
    role: "Contact Form",
    desc: "Handles form submissions without a backend. The contact form POSTs to a Formspree endpoint which forwards the message to the configured email. No server code needed.",
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
          <h4 className="portfolio-modal__claude-heading">How it fits together</h4>
          <p className="portfolio-modal__claude-text">
            The landing page is a standard React site. The game page uses React only for the UI overlay
            (score, lives, buttons) — the actual game logic runs inside a <code className="portfolio-modal__inline-code">useEffect</code> on the
            canvas, completely outside React&apos;s render cycle.
          </p>
          <div className="portfolio-modal__flow" style={{ flexWrap: "wrap", gap: "6px 0" }}>
            <span className="portfolio-modal__flow-step">Browser request</span>
            <span className="portfolio-modal__flow-arrow">→</span>
            <span className="portfolio-modal__flow-step">Next.js (routing + SSR)</span>
          </div>
          <div className="portfolio-modal__flow" style={{ flexWrap: "wrap", gap: "6px 0", marginTop: "8px" }}>
            <span className="portfolio-modal__flow-step">Landing page</span>
            <span className="portfolio-modal__flow-arrow">→</span>
            <span className="portfolio-modal__flow-step">React + Tailwind + SCSS + Framer Motion</span>
          </div>
          <div className="portfolio-modal__flow" style={{ flexWrap: "wrap", gap: "6px 0", marginTop: "8px" }}>
            <span className="portfolio-modal__flow-step">/game</span>
            <span className="portfolio-modal__flow-arrow">→</span>
            <span className="portfolio-modal__flow-step">React shell (score HUD, overlays)</span>
            <span className="portfolio-modal__flow-arrow">+</span>
            <span className="portfolio-modal__flow-step">&lt;canvas&gt; game loop (60fps)</span>
          </div>
        </div>

        <div className="portfolio-modal__claude-section">
          <h4 className="portfolio-modal__claude-heading">Canvas Game Loop</h4>
          <p className="portfolio-modal__claude-text">
            No game library — everything is written from scratch using the Canvas 2D API:
          </p>
          <ul className="portfolio-modal__bullet-list">
            <li>Gets a 2D drawing context via <code className="portfolio-modal__inline-code">canvas.getContext(&apos;2d&apos;)</code></li>
            <li>Game loop: clear canvas → update positions → draw everything → repeat at 60fps</li>
            <li>Draws shapes, images, and text using <code className="portfolio-modal__inline-code">fillRect</code>, <code className="portfolio-modal__inline-code">arc</code>, <code className="portfolio-modal__inline-code">drawImage</code></li>
            <li>Collision detection, physics, and rendering all written manually</li>
          </ul>
        </div>

        <div className="portfolio-modal__claude-section">
          <h4 className="portfolio-modal__claude-heading">Text Content Flow</h4>
          <ul className="portfolio-modal__bullet-list">
            <li>Landing-page copy → <code className="portfolio-modal__inline-code">locales/en.js</code> / <code className="portfolio-modal__inline-code">locales/fr.js</code></li>
            <li>Game HUD text → lives directly in <code className="portfolio-modal__inline-code">game.js</code></li>
            <li>Contact form → Formspree endpoint (no backend needed)</li>
          </ul>
        </div>
      </div>
    ),
  },
];

const AlifallxModal = ({ onClose }) => (
  <ProjectModal
    title="Alifallx — Under the Hood"
    tabs={TABS}
    onClose={onClose}
  />
);

export default AlifallxModal;
