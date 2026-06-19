// Cookieless, anonymous client-side analytics tracker.
//
// Design goals:
// - No cookies. The session id lives in sessionStorage (cleared when the tab
//   closes), so visits are anonymous and non-persistent.
// - Opt-out model: tracking runs by default and becomes a no-op only after the
//   visitor clicks "Decline" in the consent banner (localStorage flag), or if
//   the browser sends Do-Not-Track.
// - Events are queued client-side and flushed in batches to /api/track to keep
//   network chatter low.

const SESSION_KEY = "analytics-session-id";
const CONSENT_KEY = "analytics-consent";
const ENDPOINT = "/api/track";
const FLUSH_INTERVAL_MS = 5000;
const MAX_BATCH = 50;

let queue = [];
let flushTimer = null;

const isBrowser = () => typeof window !== "undefined";

function dntEnabled() {
  if (!isBrowser()) return false;
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return dnt === "1" || dnt === "yes";
}

export function isOptedOut() {
  if (!isBrowser()) return true;
  try {
    if (dntEnabled()) return true;
    return window.localStorage.getItem(CONSENT_KEY) === "declined";
  } catch {
    return false;
  }
}

export function getConsent() {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setConsent(value) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value); // "accepted" | "declined"
  } catch {
    /* storage unavailable — ignore */
  }
}

function getSessionId() {
  if (!isBrowser()) return null;
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        (window.crypto?.randomUUID && window.crypto.randomUUID()) ||
        `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

function deviceType() {
  if (!isBrowser()) return "desktop";
  return window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop";
}

function scheduleFlush() {
  if (flushTimer || !isBrowser()) return;
  flushTimer = window.setTimeout(() => {
    flushTimer = null;
    flush();
  }, FLUSH_INTERVAL_MS);
}

// Send queued events. Uses sendBeacon when leaving the page (survives unload),
// otherwise a keepalive fetch.
export function flush(useBeacon = false) {
  if (!isBrowser() || queue.length === 0) return;

  const batch = queue.slice(0, MAX_BATCH);
  queue = queue.slice(MAX_BATCH);

  const payload = JSON.stringify({ events: batch });

  try {
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: "application/json" }));
    } else {
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* network/beacon failure — drop silently, analytics is best-effort */
  }

  if (queue.length > 0) scheduleFlush();
}

function enqueue(event, immediate = false) {
  if (isOptedOut()) return;
  const sessionId = getSessionId();
  if (!sessionId) return;

  queue.push({
    session_id: sessionId,
    device: deviceType(),
    viewport_w: isBrowser() ? window.innerWidth : null,
    viewport_h: isBrowser() ? window.innerHeight : null,
    ...event,
  });

  if (immediate || queue.length >= MAX_BATCH) {
    flush();
  } else {
    scheduleFlush();
  }
}

export function trackPageview(path) {
  enqueue({
    event_type: "pageview",
    path,
    referrer: isBrowser() ? document.referrer || null : null,
  });
}

export function trackClick({ path, x_pct, y_pct, selector }) {
  enqueue({
    event_type: "click",
    path,
    x_pct,
    y_pct,
    meta: selector ? { selector } : null,
  });
}

export function trackScroll({ path, scroll_pct }) {
  enqueue({ event_type: "scroll", path, scroll_pct });
}

// Named business-relevant action, e.g. "contact_form_submitted", "cv_downloaded".
export function trackConversion(name, { path, label } = {}) {
  enqueue({ event_type: "conversion", path, meta: { name, label } }, true);
}

// 3+ clicks on the same element in quick succession — usually frustration, not intent.
export function trackRageClick({ path, selector, count }) {
  enqueue({ event_type: "rage_click", path, meta: { selector, count } });
}

// Click on an element with no interactive affordance (not a link/button/input/etc).
export function trackDeadClick({ path, x_pct, y_pct, selector }) {
  enqueue({ event_type: "dead_click", path, x_pct, y_pct, meta: { selector } });
}

export function trackPageleave({ path, scroll_pct, duration_ms }) {
  enqueue(
    { event_type: "pageleave", path, scroll_pct, duration_ms },
    true // immediate
  );
  flush(true); // beacon so it survives unload
}
