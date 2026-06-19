import { verifyAdmin } from "../../lib/adminAuth";
import { getAggregates, getHeatmap } from "../../lib/analyticsAggregate";

// Dashboard data API. Password-gated so the Supabase service-role key never
// reaches the client. Returns aggregates, or heatmap points when ?path= is set.
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!verifyAdmin(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const days = Math.min(365, Math.max(1, Number(req.query.days) || 30));

  if (req.query.path) {
    const heatmap = await getHeatmap(String(req.query.path), { days });
    return res.status(200).json(heatmap);
  }

  const stats = await getAggregates({ days });
  if (!stats.ok) {
    return res.status(200).json({ ok: false, reason: stats.reason || "unavailable" });
  }
  return res.status(200).json(stats);
}
