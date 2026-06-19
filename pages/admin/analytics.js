import { useEffect, useRef, useState } from "react";
import Head from "next/head";

// Password-gated analytics dashboard. All data comes from /api/admin-stats and
// /api/insights (both auth-checked server-side), so the Supabase key and Gemini
// key never reach the browser. noindex — this page must never be crawled.

function MetricCard({ label, value }) {
  return (
    <div className="admin-metric-card">
      <span className="admin-metric-card__label">{label}</span>
      <p className="admin-metric-card__value">{value}</p>
    </div>
  );
}

// Simple click heatmap: scatter the relative click points on a canvas.
function Heatmap({ points }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.fillRect(0, 0, width, height);

    for (const p of points) {
      const x = (p.x / 100) * width;
      const y = (p.y / 100) * height;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 18);
      grad.addColorStop(0, "rgba(224, 165, 224, 0.6)");
      grad.addColorStop(1, "rgba(224, 165, 224, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [points]);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={420}
      className="w-full rounded-lg border border-white/15"
    />
  );
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "heatmap", label: "Heatmap" },
  { id: "paths", label: "Paths" },
  { id: "conversions", label: "Conversions" },
  { id: "insights", label: "AI Suggestions" },
];

export default function AnalyticsDashboard() {
  const [authed, setAuthed] = useState(null); // null = checking
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [tab, setTab] = useState("overview");
  const [days, setDays] = useState(30);
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedPath, setSelectedPath] = useState(null);
  const [heatmap, setHeatmap] = useState([]);

  const [suggestions, setSuggestions] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // Check existing session on mount.
  useEffect(() => {
    fetch("/api/admin-login")
      .then((r) => r.json())
      .then((d) => setAuthed(Boolean(d.authenticated)))
      .catch(() => setAuthed(false));
  }, []);

  const loadStats = (range) => {
    setLoading(true);
    setStatsError("");
    fetch(`/api/admin-stats?days=${range}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.ok === false) {
          setStatsError("Analytics not configured or no data yet.");
          setStats(null);
        } else {
          setStats(d);
          if (d.topPages?.[0]) setSelectedPath(d.topPages[0].path);
        }
      })
      .catch(() => setStatsError("Failed to load stats."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (authed) loadStats(days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, days]);

  // Load heatmap when the selected path changes.
  useEffect(() => {
    if (!authed || !selectedPath) return;
    fetch(`/api/admin-stats?days=${days}&path=${encodeURIComponent(selectedPath)}`)
      .then((r) => r.json())
      .then((d) => setHeatmap(d.points || []))
      .catch(() => setHeatmap([]));
  }, [authed, selectedPath, days]);

  const login = async (e) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (res.ok) {
      setAuthed(true);
      setPassword("");
    } else {
      setLoginError(data.error || "Login failed");
    }
  };

  const logout = async () => {
    await fetch("/api/admin-login", { method: "DELETE" });
    setAuthed(false);
    setStats(null);
  };

  const generateInsights = async () => {
    setAiLoading(true);
    setAiError("");
    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setSuggestions(data.suggestions || "");
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const downloadStats = () => {
    if (!stats) return;
    const blob = new Blob([JSON.stringify(stats, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${days}d-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const head = (
    <Head>
      <title>Analytics Dashboard</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  );

  if (authed === null) {
    return (
      <>
        {head}
        <div className="admin-page flex min-h-screen items-center justify-center font-roboto text-white/60">
          Loading…
        </div>
      </>
    );
  }

  if (!authed) {
    return (
      <>
        {head}
        <div className="admin-page flex min-h-screen items-center justify-center px-4 font-roboto">
          <form onSubmit={login} className="admin-card w-full max-w-sm p-8">
            <h1 className="admin-title mb-1 font-anek text-2xl">Analytics</h1>
            <p className="mb-6 text-sm text-white/60">Enter the admin password.</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="admin-input mb-4"
              autoFocus
            />
            {loginError && (
              <p className="mb-3 text-sm text-[#ff8a8a]">{loginError}</p>
            )}
            <button type="submit" className="admin-btn-solid w-full">
              Sign in
            </button>
          </form>
        </div>
      </>
    );
  }

  const t = stats?.totals;

  return (
    <>
      {head}
      <div className="admin-page py-10 font-roboto">
        <div className="content-wrapper">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h1 className="admin-title font-anek text-3xl">Site Analytics</h1>
            <div className="flex items-center gap-3">
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="admin-select"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
              <button
                onClick={downloadStats}
                disabled={!stats}
                className="admin-btn-outline"
              >
                Download data
              </button>
              <button onClick={logout} className="admin-btn-outline">
                Log out
              </button>
            </div>
          </header>

          {loading && <p className="text-white/60">Loading…</p>}
          {statsError && <p className="text-[#ff8a8a]">{statsError}</p>}

          {t && (
            <>
              <section className="mb-6 grid grid-cols-6 gap-4 md:grid-cols-3 sm:grid-cols-2">
                <MetricCard label="Pageviews" value={t.pageviews} />
                <MetricCard label="Sessions" value={t.sessions} />
                <MetricCard label="Avg scroll" value={`${t.avgScrollPct}%`} />
                <MetricCard label="Avg time" value={`${t.avgTimeSec}s`} />
                <MetricCard label="Bounce rate" value={`${t.bounceRatePct}%`} />
                <MetricCard
                  label="Desktop / Mobile"
                  value={`${t.device.desktop} / ${t.device.mobile}`}
                />
              </section>

              <div className="flex flex-row gap-6 md:flex-col">
                <div
                  role="tablist"
                  className="admin-tabs flex w-48 shrink-0 flex-col gap-2 md:w-full md:flex-row md:overflow-x-auto"
                >
                  {TABS.map((tb) => (
                    <button
                      key={tb.id}
                      role="tab"
                      aria-selected={tab === tb.id}
                      onClick={() => setTab(tb.id)}
                      className={`admin-tab ${tab === tb.id ? "is-active" : ""}`}
                    >
                      {tb.label}
                    </button>
                  ))}
                </div>

                <div className="min-w-0 flex-1">

              {tab === "overview" && (
                <section className="admin-card mb-8 p-5">
                  <h2 className="admin-label mb-4">Top pages</h2>
                  <div className="overflow-x-auto">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th className="pb-2">Path</th>
                          <th className="pb-2 text-right">Views</th>
                          <th className="pb-2 text-right">Clicks</th>
                          <th className="pb-2 text-right">Avg scroll</th>
                          <th className="pb-2 text-right">Avg time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.topPages.map((p) => (
                          <tr key={p.path}>
                            <td className="py-2 pr-2">{p.path}</td>
                            <td className="py-2 text-right">{p.views}</td>
                            <td className="py-2 text-right">{p.clicks}</td>
                            <td className="py-2 text-right">{p.avgScrollPct}%</td>
                            <td className="py-2 text-right">{p.avgTimeSec}s</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {tab === "heatmap" && (
                <section className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-1">
                  <div className="admin-card p-5">
                    <h2 className="admin-label mb-3">Click heatmap</h2>
                    <select
                      value={selectedPath || ""}
                      onChange={(e) => setSelectedPath(e.target.value)}
                      className="admin-select mb-3 w-full"
                    >
                      {stats.topPages.map((p) => (
                        <option key={p.path} value={p.path}>
                          {p.path}
                        </option>
                      ))}
                    </select>
                    {heatmap.length === 0 ? (
                      <p className="text-sm text-white/50">
                        No click data for this page yet.
                      </p>
                    ) : (
                      <Heatmap points={heatmap} />
                    )}
                  </div>

                  <div className="admin-card p-5">
                    <h2 className="admin-label mb-3">Most-clicked elements</h2>
                    <ul className="space-y-1 text-sm">
                      {stats.topClicks.map((c) => (
                        <li
                          key={c.selector}
                          className="flex justify-between border-b border-white/10 py-1"
                        >
                          <code className="text-white/75">{c.selector}</code>
                          <span className="text-white/50">{c.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="admin-card p-5">
                    <h2 className="admin-label mb-3">
                      Rage clicks
                      <span className="ml-2 font-normal normal-case tracking-normal text-white/50">
                        3+ rapid clicks on the same element — usually frustration
                      </span>
                    </h2>
                    {(stats.rageClicks || []).length === 0 ? (
                      <p className="text-sm text-white/50">None detected.</p>
                    ) : (
                      <ul className="space-y-1 text-sm">
                        {stats.rageClicks.map((r) => (
                          <li
                            key={`${r.path}|${r.selector}`}
                            className="flex justify-between gap-3 border-b border-white/10 py-1"
                          >
                            <span className="text-white/75">
                              <code>{r.selector}</code>{" "}
                              <span className="text-white/40">on {r.path}</span>
                            </span>
                            <span className="shrink-0 text-white/50">{r.count}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="admin-card p-5">
                    <h2 className="admin-label mb-3">
                      Dead clicks
                      <span className="ml-2 font-normal normal-case tracking-normal text-white/50">
                        clicks on non-interactive elements
                      </span>
                    </h2>
                    {(stats.deadClicks || []).length === 0 ? (
                      <p className="text-sm text-white/50">None detected.</p>
                    ) : (
                      <ul className="space-y-1 text-sm">
                        {stats.deadClicks.map((d) => (
                          <li
                            key={`${d.path}|${d.selector}`}
                            className="flex justify-between gap-3 border-b border-white/10 py-1"
                          >
                            <span className="text-white/75">
                              <code>{d.selector}</code>{" "}
                              <span className="text-white/40">on {d.path}</span>
                            </span>
                            <span className="shrink-0 text-white/50">{d.count}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              )}

              {tab === "paths" && (
                <section className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-1">
                  <div className="admin-card p-5">
                    <h2 className="admin-label mb-3">Entry pages</h2>
                    <ul className="space-y-1 text-sm">
                      {(stats.topEntryPages || []).map((p) => (
                        <li
                          key={p.path}
                          className="flex justify-between border-b border-white/10 py-1"
                        >
                          <span className="text-white/75">{p.path}</span>
                          <span className="text-white/50">{p.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="admin-card p-5">
                    <h2 className="admin-label mb-3">Exit pages</h2>
                    <ul className="space-y-1 text-sm">
                      {(stats.topExitPages || []).map((p) => (
                        <li
                          key={p.path}
                          className="flex justify-between border-b border-white/10 py-1"
                        >
                          <span className="text-white/75">{p.path}</span>
                          <span className="text-white/50">{p.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="admin-card p-5">
                    <h2 className="admin-label mb-3">Common page-to-page jumps</h2>
                    <ul className="space-y-1 text-sm">
                      {(stats.topTransitions || []).map((tr) => (
                        <li
                          key={tr.transition}
                          className="flex justify-between border-b border-white/10 py-1"
                        >
                          <span className="text-white/75">{tr.transition}</span>
                          <span className="text-white/50">{tr.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="admin-card p-5">
                    <h2 className="admin-label mb-3">Top full paths</h2>
                    <ul className="space-y-1 text-sm">
                      {(stats.topPaths || []).map((p) => (
                        <li
                          key={p.sequence}
                          className="flex justify-between gap-3 border-b border-white/10 py-1"
                        >
                          <span className="text-white/75">{p.sequence}</span>
                          <span className="shrink-0 text-white/50">{p.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {tab === "conversions" && (
                <section className="admin-card mb-8 p-5">
                  <h2 className="admin-label mb-4">
                    Conversions
                    <span className="ml-2 font-normal normal-case tracking-normal text-white/50">
                      contact form submits, CV downloads, project clicks, chat opens
                    </span>
                  </h2>
                  {(stats.conversions || []).length === 0 ? (
                    <p className="text-sm text-white/50">No conversions yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th className="pb-2">Event</th>
                            <th className="pb-2">Detail</th>
                            <th className="pb-2 text-right">Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.conversions.map((c) => (
                            <tr key={`${c.name}|${c.label}`}>
                              <td className="py-2 pr-2">{c.name}</td>
                              <td className="py-2 pr-2 text-white/60">{c.label || "—"}</td>
                              <td className="py-2 text-right">{c.count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              )}

              {tab === "insights" && (
                <section className="admin-card p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="admin-label">AI suggestions</h2>
                    <button
                      onClick={generateInsights}
                      disabled={aiLoading}
                      className="admin-btn-solid"
                    >
                      {aiLoading ? "Analyzing…" : "Generate suggestions"}
                    </button>
                  </div>
                  {aiError && <p className="text-sm text-[#ff8a8a]">{aiError}</p>}
                  {suggestions ? (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-white/85">
                      {suggestions}
                    </div>
                  ) : (
                    <p className="text-sm text-white/50">
                      Click “Generate suggestions” to have AI analyze the metrics
                      above and recommend improvements.
                    </p>
                  )}
                </section>
              )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
