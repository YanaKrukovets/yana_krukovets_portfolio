import { GoogleGenerativeAI } from "@google/generative-ai";
import { verifyAdmin } from "../../lib/adminAuth";
import { getAggregates } from "../../lib/analyticsAggregate";

// AI improvement suggestions for the portfolio. Reuses the Gemini setup from
// pages/api/chat.js. Only aggregated metrics are sent to the model — never raw
// visitor rows. Password-gated.
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const model = genAI
  ? genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction:
        "You are a senior web analytics and conversion consultant reviewing metrics for a freelance full-stack developer's portfolio site (yanakrukovets.com). The site's goal is to convert visitors into contacts/clients. Given the metrics, give 3-5 specific, prioritized, actionable suggestions to improve engagement and conversions. Reference concrete numbers from the data. Be concise and practical — no fluff, no generic advice. Format as a numbered markdown list with a short bold headline per item.",
    })
  : null;

// Short in-memory cache so refreshing the dashboard doesn't burn Gemini quota.
let cache = { at: 0, days: null, data: null };
const CACHE_TTL_MS = 5 * 60 * 1000;

function buildPrompt(stats) {
  const { totals, topPages, topClicks, rangeDays, eventsAnalyzed } = stats;
  const pages = topPages
    .slice(0, 10)
    .map(
      (p) =>
        `- ${p.path}: ${p.views} views, ${p.clicks} clicks, avg scroll ${p.avgScrollPct}%, avg time ${p.avgTimeSec}s`
    )
    .join("\n");
  const clicks = topClicks
    .slice(0, 10)
    .map((c) => `- ${c.selector}: ${c.count} clicks`)
    .join("\n");

  return `Analytics summary for the last ${rangeDays} days (${eventsAnalyzed} events analyzed):

TOTALS
- Pageviews: ${totals.pageviews}
- Unique sessions: ${totals.sessions}
- Avg scroll depth: ${totals.avgScrollPct}%
- Avg time on page: ${totals.avgTimeSec}s
- Device split: ${totals.device.desktop} desktop / ${totals.device.mobile} mobile pageviews

TOP PAGES
${pages || "(no page data)"}

MOST-CLICKED ELEMENTS
${clicks || "(no click data)"}

Based on this, what should the developer change to get more visitors to contact her?`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!verifyAdmin(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!model) {
    return res.status(503).json({ error: "AI insights are not configured" });
  }

  const days = Math.min(365, Math.max(1, Number(req.body?.days) || 30));

  if (cache.data && cache.days === days && Date.now() - cache.at < CACHE_TTL_MS) {
    return res.status(200).json({ ...cache.data, cached: true });
  }

  const stats = await getAggregates({ days });
  if (!stats.ok) {
    return res.status(503).json({ error: "Analytics data is unavailable" });
  }
  if (stats.eventsAnalyzed === 0) {
    return res
      .status(200)
      .json({ summary: stats.totals, suggestions: "Not enough data yet — check back once the site has some traffic." });
  }

  try {
    const result = await model.generateContent(buildPrompt(stats));
    const suggestions = result.response.text();
    const payload = { summary: stats.totals, suggestions };
    cache = { at: Date.now(), days, data: payload };
    return res.status(200).json(payload);
  } catch (err) {
    console.error("Gemini insights error:", err);
    return res.status(500).json({ error: "Failed to generate suggestions" });
  }
}
