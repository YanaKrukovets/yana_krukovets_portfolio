import { supabaseAdmin } from "./supabaseAdmin";

// Pulls recent analytics rows from Supabase and computes the aggregates used by
// both the dashboard (/api/admin-stats) and the AI insights route
// (/api/insights). Raw rows never leave the server — only summaries do.

const DEFAULT_DAYS = 30;
const ROW_CAP = 10000; // safety cap on rows fetched per query

function avg(nums) {
  const vals = nums.filter((n) => typeof n === "number" && !Number.isNaN(n));
  if (vals.length === 0) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

// Returns { ok: false } when Supabase isn't configured, else { ok: true, ...aggregates }.
export async function getAggregates({ days = DEFAULT_DAYS } = {}) {
  const db = supabaseAdmin();
  if (!db) return { ok: false, reason: "not-configured" };

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await db
    .from("analytics_events")
    .select("session_id, event_type, path, device, scroll_pct, duration_ms, x_pct, y_pct, meta, created_at")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(ROW_CAP);

  if (error) return { ok: false, reason: error.message };

  // Process chronologically so per-session page sequences come out in visit order.
  const rows = [...(data || [])].reverse();
  const sessions = new Set();
  const byPath = new Map(); // path -> { views, clicks, scrolls:[], durations:[] }
  const selectorCounts = new Map();
  const device = { mobile: 0, desktop: 0 };
  const pageviewsBySession = new Map(); // session_id -> [path, ...] in chronological order
  const conversionCounts = new Map(); // "name|label" -> count
  const rageClickCounts = new Map(); // "path|selector" -> count
  const deadClickCounts = new Map(); // "path|selector" -> count

  const ensurePath = (p) => {
    const key = p || "(unknown)";
    if (!byPath.has(key)) {
      byPath.set(key, { views: 0, clicks: 0, scrolls: [], durations: [] });
    }
    return byPath.get(key);
  };

  for (const r of rows) {
    sessions.add(r.session_id);
    const bucket = ensurePath(r.path);

    if (r.event_type === "pageview") {
      bucket.views += 1;
      if (r.device === "mobile" || r.device === "desktop") device[r.device] += 1;

      const seq = pageviewsBySession.get(r.session_id) || [];
      const lastPath = seq[seq.length - 1];
      if (lastPath !== (r.path || "(unknown)")) seq.push(r.path || "(unknown)");
      pageviewsBySession.set(r.session_id, seq);
    } else if (r.event_type === "click") {
      bucket.clicks += 1;
      const sel = r.meta?.selector;
      if (sel) selectorCounts.set(sel, (selectorCounts.get(sel) || 0) + 1);
    } else if (r.event_type === "scroll") {
      if (typeof r.scroll_pct === "number") bucket.scrolls.push(r.scroll_pct);
    } else if (r.event_type === "pageleave") {
      if (typeof r.duration_ms === "number") bucket.durations.push(r.duration_ms);
      if (typeof r.scroll_pct === "number") bucket.scrolls.push(r.scroll_pct);
    } else if (r.event_type === "conversion") {
      const name = r.meta?.name || "(unnamed)";
      const label = r.meta?.label;
      const key = label ? `${name}|${label}` : name;
      conversionCounts.set(key, (conversionCounts.get(key) || 0) + 1);
    } else if (r.event_type === "rage_click") {
      const key = `${r.path || "(unknown)"}|${r.meta?.selector || "(unknown)"}`;
      rageClickCounts.set(key, (rageClickCounts.get(key) || 0) + 1);
    } else if (r.event_type === "dead_click") {
      const key = `${r.path || "(unknown)"}|${r.meta?.selector || "(unknown)"}`;
      deadClickCounts.set(key, (deadClickCounts.get(key) || 0) + 1);
    }
  }

  const topPages = [...byPath.entries()]
    .map(([path, v]) => ({
      path,
      views: v.views,
      clicks: v.clicks,
      avgScrollPct: avg(v.scrolls),
      avgTimeSec: Math.round(avg(v.durations) / 1000),
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 20);

  const topClicks = [...selectorCounts.entries()]
    .map(([selector, count]) => ({ selector, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // Per-session navigation: entry/exit pages, page-to-page transitions, and
  // full sequences (capped length) for the "Paths" view.
  const entryCounts = new Map();
  const exitCounts = new Map();
  const transitionCounts = new Map(); // "from -> to" -> count
  const sequenceCounts = new Map(); // "a > b > c" -> count
  const MAX_SEQUENCE_STEPS = 5;

  let bouncedSessions = 0;
  let sessionsWithPageview = 0;

  for (const seq of pageviewsBySession.values()) {
    if (seq.length === 0) continue;
    sessionsWithPageview += 1;
    if (seq.length === 1) bouncedSessions += 1;

    const entry = seq[0];
    const exit = seq[seq.length - 1];
    entryCounts.set(entry, (entryCounts.get(entry) || 0) + 1);
    exitCounts.set(exit, (exitCounts.get(exit) || 0) + 1);

    for (let i = 0; i < seq.length - 1; i++) {
      const key = `${seq[i]} → ${seq[i + 1]}`;
      transitionCounts.set(key, (transitionCounts.get(key) || 0) + 1);
    }

    const truncated = seq.slice(0, MAX_SEQUENCE_STEPS);
    const suffix = seq.length > MAX_SEQUENCE_STEPS ? " → …" : "";
    const seqKey = truncated.join(" → ") + suffix;
    sequenceCounts.set(seqKey, (sequenceCounts.get(seqKey) || 0) + 1);
  }

  const topEntryPages = [...entryCounts.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topExitPages = [...exitCounts.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topTransitions = [...transitionCounts.entries()]
    .map(([transition, count]) => ({ transition, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  const topPaths = [...sequenceCounts.entries()]
    .map(([sequence, count]) => ({ sequence, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  const bounceRatePct =
    sessionsWithPageview === 0
      ? 0
      : Math.round((bouncedSessions / sessionsWithPageview) * 100);

  const conversions = [...conversionCounts.entries()]
    .map(([key, count]) => {
      const [name, label] = key.split("|");
      return { name, label: label || null, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 30);

  const rageClicks = [...rageClickCounts.entries()]
    .map(([key, count]) => {
      const [path, selector] = key.split("|");
      return { path, selector, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  const deadClicks = [...deadClickCounts.entries()]
    .map(([key, count]) => {
      const [path, selector] = key.split("|");
      return { path, selector, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  const totalViews = topPages.reduce((s, p) => s + p.views, 0);
  const allDurations = rows
    .filter((r) => r.event_type === "pageleave" && typeof r.duration_ms === "number")
    .map((r) => r.duration_ms);
  const allScrolls = rows
    .filter((r) => typeof r.scroll_pct === "number")
    .map((r) => r.scroll_pct);

  return {
    ok: true,
    rangeDays: days,
    eventsAnalyzed: rows.length,
    totals: {
      pageviews: totalViews,
      sessions: sessions.size,
      avgScrollPct: avg(allScrolls),
      avgTimeSec: Math.round(avg(allDurations) / 1000),
      bounceRatePct,
      device,
    },
    topPages,
    topClicks,
    topEntryPages,
    topExitPages,
    topTransitions,
    topPaths,
    conversions,
    rageClicks,
    deadClicks,
  };
}

// Click coordinates for a single path's heatmap (capped for payload size).
// Desktop-only: the preview panel renders the page at a fixed desktop width
// (see HEATMAP_FRAME_WIDTH in pages/admin/analytics.js), and this site's
// responsive layout reflows completely on mobile, so mobile x_pct/y_pct
// values don't correspond to the same visual spot on the desktop render.
export async function getHeatmap(path, { days = DEFAULT_DAYS, limit = 2000 } = {}) {
  const db = supabaseAdmin();
  if (!db) return { ok: false, points: [] };

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await db
    .from("analytics_events")
    .select("x_pct, y_pct")
    .eq("event_type", "click")
    .eq("path", path)
    .eq("device", "desktop")
    .gte("created_at", since)
    .not("x_pct", "is", null)
    .limit(limit);

  if (error) return { ok: false, points: [] };
  return {
    ok: true,
    points: (data || []).map((r) => ({ x: r.x_pct, y: r.y_pct })),
  };
}
