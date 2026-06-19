import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  trackPageview,
  trackClick,
  trackScroll,
  trackPageleave,
  trackRageClick,
  trackDeadClick,
  flush,
} from "../lib/analytics";

// Elements considered "interactive" — a click on anything else is a candidate
// dead click (the visitor expected something to happen and nothing did).
const INTERACTIVE_SELECTOR =
  "a, button, input, select, textarea, label, summary, [role='button'], [onclick], [contenteditable]";

// Rage-click tuning: 3+ clicks on the same element within 1s.
const RAGE_CLICK_WINDOW_MS = 1000;
const RAGE_CLICK_THRESHOLD = 3;

// Headless global tracker (renders nothing). Mounted once in _app.js.
// Captures pageviews (incl. SPA route changes), clicks with relative
// coordinates for heatmaps, max scroll depth, and time-on-page on leave.
//
// useEffect cleanup follows the codebase convention in hooks/useScrollReveal.js:
// every listener/observer attached here is removed in the returned cleanup.

// Build a short, stable-ish CSS-like selector for a clicked element.
function describeTarget(el) {
  if (!el || !el.tagName) return null;
  const tag = el.tagName.toLowerCase();
  if (el.id) return `${tag}#${el.id}`;
  const cls =
    typeof el.className === "string" && el.className.trim()
      ? `.${el.className.trim().split(/\s+/).slice(0, 2).join(".")}`
      : "";
  return `${tag}${cls}`.slice(0, 120);
}

export default function AnalyticsTracker() {
  const router = useRouter();
  // Per-page mutable state, reset on each navigation.
  const pageState = useRef({ path: null, start: 0, maxScroll: 0 });

  // Pageviews: initial load + every completed client-side navigation.
  useEffect(() => {
    const startPage = (path) => {
      pageState.current = { path, start: Date.now(), maxScroll: 0 };
      trackPageview(path);
    };

    startPage(window.location.pathname);

    const handleRouteChange = (url) => {
      // Flush the previous page's time-on-page before starting a new one.
      const prev = pageState.current;
      if (prev.path) {
        trackPageleave({
          path: prev.path,
          scroll_pct: prev.maxScroll,
          duration_ms: Date.now() - prev.start,
        });
      }
      startPage(url.split("?")[0].split("#")[0]);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  // Clicks (heatmap coordinates relative to the full document), plus
  // rage-click and dead-click detection layered on the same stream.
  const rageState = useRef({ selector: null, times: [], firedFor: null });
  useEffect(() => {
    const onClick = (e) => {
      const docW = document.documentElement.scrollWidth || 1;
      const docH = document.documentElement.scrollHeight || 1;
      const x = e.pageX ?? e.clientX + window.scrollX;
      const y = e.pageY ?? e.clientY + window.scrollY;
      const x_pct = Math.round((x / docW) * 10000) / 100;
      const y_pct = Math.round((y / docH) * 10000) / 100;
      const selector = describeTarget(e.target);
      const path = pageState.current.path;

      trackClick({ path, x_pct, y_pct, selector });

      // Rage click: 3+ clicks on the same element within a 1s window.
      const now = Date.now();
      const rs = rageState.current;
      if (rs.selector !== selector) {
        rs.selector = selector;
        rs.times = [];
        rs.firedFor = null;
      }
      rs.times = rs.times.filter((t) => now - t < RAGE_CLICK_WINDOW_MS);
      rs.times.push(now);
      if (rs.times.length >= RAGE_CLICK_THRESHOLD && rs.firedFor !== selector) {
        rs.firedFor = selector; // only fire once per cluster, not every click after threshold
        trackRageClick({ path, selector, count: rs.times.length });
      }

      // Dead click: clicked element (or an ancestor) has no interactive affordance.
      if (!e.target.closest?.(INTERACTIVE_SELECTOR)) {
        trackDeadClick({ path, x_pct, y_pct, selector });
      }
    };
    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Scroll depth (throttled via rAF); records the max reached this page.
  useEffect(() => {
    let ticking = false;
    const measure = () => {
      ticking = false;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        scrollable <= 0
          ? 100
          : Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      if (pct > pageState.current.maxScroll) {
        pageState.current.maxScroll = pct;
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Page leave / tab close: record final scroll depth + duration via beacon.
  useEffect(() => {
    const finalize = () => {
      const p = pageState.current;
      if (!p.path) return;
      trackScroll({ path: p.path, scroll_pct: p.maxScroll });
      trackPageleave({
        path: p.path,
        scroll_pct: p.maxScroll,
        duration_ms: Date.now() - p.start,
      });
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        finalize();
        flush(true);
      }
    };
    window.addEventListener("pagehide", finalize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", finalize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
