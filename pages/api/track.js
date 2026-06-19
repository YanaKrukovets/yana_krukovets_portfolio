import { supabaseAdmin } from "../../lib/supabaseAdmin";

// Analytics event ingestion. The browser (lib/analytics.js) batches anonymous,
// cookieless events and POSTs them here; we validate, sanitise, and insert into
// Supabase. This is best-effort: any failure returns 204 so a visitor's page is
// never affected.
//
// Rate limiting mirrors pages/api/chat.js (in-memory Map by IP). The limit is
// higher because events arrive in batches.
const rateLimitMap = new Map();
const RATE_LIMIT = 60;
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

const ALLOWED_TYPES = new Set([
  "pageview",
  "click",
  "scroll",
  "pageleave",
  "conversion",
  "rage_click",
  "dead_click",
]);
const ALLOWED_DEVICES = new Set(["mobile", "desktop"]);
const MAX_EVENTS = 50;

function str(v, max) {
  return typeof v === "string" ? v.slice(0, max) : null;
}

// Coerce to a number within [min, max], or null if not a finite number.
function clamp(v, min, max) {
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  return Math.min(max, Math.max(min, n));
}

// Validate + normalise a single raw event into a DB row, or null to drop it.
function sanitize(ev) {
  if (!ev || typeof ev !== "object") return null;
  if (!ALLOWED_TYPES.has(ev.event_type)) return null;
  if (typeof ev.session_id !== "string" || !ev.session_id) return null;

  let meta = null;
  if (ev.meta && typeof ev.meta === "object") {
    meta = {
      selector: str(ev.meta.selector, 120),
      name: str(ev.meta.name, 80),
      label: str(ev.meta.label, 120),
      count: ev.meta.count == null ? null : Math.round(clamp(ev.meta.count, 0, 1000)),
    };
  }

  return {
    session_id: ev.session_id.slice(0, 100),
    event_type: ev.event_type,
    path: str(ev.path, 300),
    referrer: str(ev.referrer, 500),
    device: ALLOWED_DEVICES.has(ev.device) ? ev.device : null,
    viewport_w: clamp(ev.viewport_w, 0, 20000),
    viewport_h: clamp(ev.viewport_h, 0, 20000),
    x_pct: clamp(ev.x_pct, 0, 100),
    y_pct: clamp(ev.y_pct, 0, 100),
    scroll_pct: ev.scroll_pct == null ? null : Math.round(clamp(ev.scroll_pct, 0, 100)),
    duration_ms: ev.duration_ms == null ? null : Math.round(clamp(ev.duration_ms, 0, 86_400_000)),
    meta,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).end();
  }

  const events = req.body?.events;
  if (!Array.isArray(events) || events.length === 0) {
    return res.status(204).end();
  }

  const rows = events.slice(0, MAX_EVENTS).map(sanitize).filter(Boolean);
  if (rows.length === 0) {
    return res.status(204).end();
  }

  const db = supabaseAdmin();
  if (!db) {
    // Supabase not configured — accept silently so the site never breaks.
    return res.status(204).end();
  }

  try {
    const { error } = await db.from("analytics_events").insert(rows);
    if (error) console.error("Analytics insert error:", error.message);
  } catch (err) {
    console.error("Analytics insert exception:", err);
  }

  return res.status(204).end();
}
