import ProjectModal from "./ProjectModal";

const TECH = [
  {
    name: "Next.js 16",
    role: "Framework",
    desc: "App Router on React 19. Plain JavaScript only — no TypeScript; every file starts with // @ts-check + JSDoc for type safety instead.",
  },
  {
    name: "Tailwind v4",
    role: "Styling",
    desc: "Utility classes written directly in JSX, same convention as the rest of the portfolio's projects.",
  },
  {
    name: "Vercel AI SDK v6",
    role: "AI orchestration",
    desc: "Drives both LLM agents (planner and session) via the ai package, talking to Google Gemini through @ai-sdk/google.",
  },
  {
    name: "Google Gemini",
    role: "Model — gemini-3.1-flash-lite",
    desc: "Chosen as the cheapest free-tier model available, since the app runs two agents per session and needs to stay within free-tier quota.",
  },
  {
    name: "Postgres + Neon",
    role: "Database",
    desc: "Serverless Postgres via the Neon driver. All access funnels through src/lib/db/queries.js — no raw queries scattered across the codebase.",
  },
  {
    name: "Drizzle ORM",
    role: "Data layer",
    desc: "Typed schema and query builder on top of the Neon driver, paired with JSDoc annotations since the project has no TypeScript.",
  },
  {
    name: "Auth.js v5",
    role: "Authentication",
    desc: "next-auth beta, configured with Google OAuth as the only sign-in method.",
  },
  {
    name: "Zod",
    role: "Validation",
    desc: "Every LLM response and request body is schema-validated — raw LLM JSON is never trusted directly.",
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
          <h4 className="portfolio-modal__claude-heading">The core thesis</h4>
          <p className="portfolio-modal__claude-text">
            FocusCopilot is built around task initiation, not task management. The feature gate
            baked into the project&apos;s CLAUDE.md is literally: &ldquo;Does this feature increase the
            probability a user starts a task within the next 5 minutes?&rdquo; — if no, it doesn&apos;t ship.
            That&apos;s why there are no projects, tags, kanban boards, priorities, or nested subtasks,
            and no &ldquo;overdue&rdquo; state anywhere — unfinished work just rolls forward silently,
            with no shame language in the copy.
          </p>
        </div>

        <div className="portfolio-modal__claude-section">
          <h4 className="portfolio-modal__claude-heading">Two LLM agents</h4>
          <ul className="portfolio-modal__bullet-list">
            <li>
              <strong>Planner agent</strong> (src/lib/agents/planner.js) — produces the daily plan,
              hard-capped at 3 suggested tasks, each with a first action ≤5 minutes.
            </li>
            <li>
              <strong>Session agent</strong> (src/lib/agents/session.js) — runs the live work session
              as a tool-calling loop with tools: update_task_state, split_task, set_checkin_timer,
              log_blocker, end_session — capped at 3 tool steps to conserve free-tier quota.
            </li>
          </ul>
        </div>

        <div className="portfolio-modal__claude-section">
          <h4 className="portfolio-modal__claude-heading">Prompts &amp; telemetry</h4>
          <ul className="portfolio-modal__bullet-list">
            <li>Prompts live as versioned markdown files in src/lib/prompts/*.md, loaded at runtime — any edit requires a version bump, changelog entry, and eval rerun.</li>
            <li>Every LLM call is wrapped by src/lib/telemetry.js, logging model, tokens, cost, latency, and prompt version to an agent_calls table.</li>
            <li>Custom eval harnesses (npm run evals:planner / evals:session) score the agents against rubrics.</li>
          </ul>
        </div>

        <div className="portfolio-modal__claude-section">
          <h4 className="portfolio-modal__claude-heading">Anxiety-aware UI</h4>
          <ul className="portfolio-modal__bullet-list">
            <li>A daily replan cron (Vercel Cron, 7am UTC) picks up to 3 shortest pending tasks each morning.</li>
            <li>No countdown timers anywhere — only elapsed-time indicators, to avoid anxiety-inducing pressure.</li>
          </ul>
        </div>
      </div>
    ),
  },
];

const FocusCopilotModal = ({ onClose }) => (
  <ProjectModal
    title="FocusCopilot — Under the Hood"
    tabs={TABS}
    onClose={onClose}
  />
);

export default FocusCopilotModal;
