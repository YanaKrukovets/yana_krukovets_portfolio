import { GoogleGenerativeAI } from "@google/generative-ai";

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

const SYSTEM_CONTEXT = `You are a helpful assistant on Yana Krukovets' portfolio website. Answer questions about Yana based on the following information. Be friendly, concise, and professional. If asked something you don't know about Yana, say you're not sure and suggest contacting her directly.

ABOUT YANA:
Yana Krukovets is a Full Stack Developer based in Ottawa, Canada with 4+ years of professional experience. She likes to code things from scratch and enjoys bringing ideas to life in the browser.

SKILLS:
HTML5, CSS3, JavaScript, React, Next.js, TypeScript, GraphQL, Tailwind CSS, Sass/SCSS, jQuery, Bootstrap, WordPress, Sanity CMS, PHP, MySQL, Stripe integration, Agile/SCRUM

EXPERIENCE:
- Full Stack Developer at Elite Digital (Jul 2025 — May 2026), Ontario, Canada
- Frontend Developer at Elite Digital (Jan 2023 — Jan 2024), Ontario, Canada
- Frontend Developer at SoftServe (Jan 2013 — May 2016), Dnipro, Ukraine
- Teacher of C++ at IT Academy "Step" (2011 — 2013), Dnipro, Ukraine

PROJECTS:
1. Art Gallery (2024) — Online art gallery showcasing original artworks with a CMS-driven catalog. Built with Next.js, Tailwind CSS, Sass. URL: https://yanaartgallery.vercel.app
2. This Portfolio (2024) — Personal portfolio site. Built with Next.js, Tailwind CSS, Sass. URL: yanakrukovets.com
3. Art Shop (2023) — E-commerce art shop with Sanity CMS, Stripe payments, and a custom storefront. Built with Next.js, Sanity, Stripe.

WORK PROJECTS (at Elite Digital):
- Elite Digital Health website (2023) — Next.js, Tailwind CSS, Sass
- Elite Digital main website (2023) — Next.js, Tailwind CSS, Sass
- Orijin Support website (2023) — WordPress, PHP, CSS
- Bloom website (2023) — WordPress, PHP, CSS

HOBBIES: Spending time with family, playing with kids, traveling, cycling, hiking, painting.

CONTACT: Visitors can reach Yana via the contact form on this site, or connect on GitHub (github.com/YanaKrukovets) or LinkedIn (linkedin.com/in/yana-krukovets-25658260/).

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
