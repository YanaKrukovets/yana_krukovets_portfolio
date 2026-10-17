import { GoogleGenerativeAI } from "@google/generative-ai";
import { BLOG_POSTS } from "../../lib/blogPosts";
import { projects, projectsWork } from "../../lib/projects";

// In-memory rate limiter: max 10 requests per IP per minute.
// Note: resets on cold start and is NOT shared across serverless instances —
// provides basic abuse protection in dev/low-traffic but not a hard guarantee in prod.
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  rateLimitMap.set(ip, { count: entry.count + 1, start: entry.start });
  return false;
}

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Built from the shared BLOG_POSTS source of truth so the assistant stays in
// sync with the blog automatically as new posts are published.
const BLOG_SECTION = BLOG_POSTS.map(
  (post) =>
    `- "${post.title}" (${post.category}, ${post.date}) — ${post.description} URL: https://www.yanakrukovets.com/blog/${post.slug}`
).join("\n");

// Same idea for projects — generated from lib/projects.js so new cards show up
// in the assistant's knowledge without editing this file.
const formatProject = (p) =>
  `- ${p.name} (${p.year}) — ${p.description} Tech: ${p.tech}. URL: ${p.href}`;
const PROJECTS_SECTION = projects.map(formatProject).join("\n");
const WORK_PROJECTS_SECTION = projectsWork.map(formatProject).join("\n");

const SYSTEM_CONTEXT = `You are a helpful assistant on Yana Krukovets' portfolio website. Answer questions about Yana based on the following information. Be friendly, concise, and professional. If asked something you don't know about Yana, say you're not sure and suggest contacting her directly.

ABOUT YANA:
Yana Krukovets is a Full Stack Developer with a focus on the frontend, based in Ottawa, Canada, with 6+ years of professional experience. She likes to code things from scratch and enjoys bringing ideas to life in the browser, with a focus on fast, intuitive, and accessible user experiences. She has also built native iOS apps in Swift published on the App Store, and taught C++ to kids. Lately she has been exploring Python and AI — machine learning, model training, and AI safety (reward hacking research) — and uses AI-assisted tools like Claude Code in her daily workflow. She is open to freelance, contract, and full-time opportunities.

SKILLS:
HTML5, CSS3, JavaScript, React, Next.js, Tailwind CSS, Sass/SCSS, jQuery, Bootstrap, WordPress, Sanity CMS, Shopify, PHP, MySQL, Postgres, Supabase, Drizzle ORM, Gemini, Claude Code, Docker, Swift (iOS), Python (basics), C++ (basics), Agile/SCRUM

EXPERIENCE:
- Full Stack Developer at Elite Digital (Jul 2025 — Jun 2026), Ontario, Canada — Next.js, Sanity, WordPress, Shopify, Supabase, PHP, MySQL, site performance, Claude Code; customer communication, architecture decisions, feature delivery, code review
- Frontend Developer at Elite Digital (Jan 2023 — Jan 2024), Ontario, Canada — React, Next.js, Sanity, WordPress, Jekyll, Liquid, Sass, Docker
- Independent iOS Developer, Freelance (Jan 2020 — Dec 2021), Remote — designed, built, and published three children's iOS apps in Swift on the App Store
- Frontend Developer at SoftServe (Jan 2013 — May 2016), Dnipro, Ukraine — JavaScript, HTML, CSS, Bootstrap, Backbone.js
- Teacher of C++ at IT Academy "Step" (2011 — 2013), Dnipro, Ukraine — taught C++ basics to kids aged 10-14

PERSONAL PROJECTS:
${PROJECTS_SECTION}

WORK PROJECTS (at Elite Digital):
${WORK_PROJECTS_SECTION}

HOBBIES: Hiking, biking, skiing, skating, painting, watching great films, and spending time with family.

BLOG POSTS (Yana writes about web development, SEO, Next.js, WordPress, and game dev):
${BLOG_SECTION}
If a visitor asks about a topic Yana has written about, point them to the relevant blog post and share its URL. Only share blog URLs exactly as listed above — never invent one. For the full list of posts, point them to https://www.yanakrukovets.com/blog.

LINKING: Whenever you mention a specific project, blog post, or work sample by name, include its URL from the lists above so the visitor can click through. If a visitor asks to see Yana's projects in general (rather than one in particular), point them to https://www.yanakrukovets.com/projects.

RESUME: Visitors can download Yana's CV at https://www.yanakrukovets.com/Yana_Krukovets_CV.pdf

CONTACT: Visitors can reach Yana via the contact form on this site (https://www.yanakrukovets.com/contact), or connect on GitHub (github.com/YanaKrukovets) or LinkedIn (linkedin.com/in/yana-krukovets-25658260/).

LOCATION: Ottawa, Canada

Keep responses brief (2-4 sentences max). If asked about availability or hiring, encourage them to use the contact form.`;

const ALLOWED_ROLES = new Set(["user", "model"]);

const model = genAI
  ? genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: SYSTEM_CONTEXT })
  : null;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket.remoteAddress || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please wait a moment." });
  }

  const { message, history } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: "Message too long" });
  }
  if (Array.isArray(history) && history.length > 40) {
    return res.status(400).json({ error: "History too long" });
  }

  if (!model) {
    return res.status(503).json({ error: "Chat is currently unavailable" });
  }

  try {
    const safeHistory = (history || [])
      .filter((msg) => msg != null && typeof msg === "object" && ALLOWED_ROLES.has(msg.role) && typeof msg.text === "string")
      .map((msg) => ({ role: msg.role, parts: [{ text: msg.text.slice(0, 2000) }] }));

    const chat = model.startChat({ history: safeHistory });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    res.status(200).json({ reply: text });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to get response" });
  }
}
