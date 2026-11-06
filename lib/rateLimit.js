// Shared rate limiter for API routes.
//
// If UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set, counts live in
// Upstash Redis, so the limit holds across every serverless instance. Without
// them it falls back to an in-memory Map, which only limits per instance and
// resets on cold start — better than nothing, but not a hard guarantee.

const memory = new Map();

function memoryLimited(key, limit, windowMs) {
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || now - entry.start > windowMs) {
    memory.set(key, { count: 1, start: now });
    // Keep the map from growing forever on a long-lived instance.
    if (memory.size > 5000) {
      for (const [k, v] of memory) {
        if (now - v.start > windowMs) memory.delete(k);
      }
    }
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

async function redisLimited(key, limit, windowMs) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  // Fixed window: one Redis key per window, expires on its own.
  const windowKey = `rl:${key}:${Math.floor(Date.now() / windowMs)}`;
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", windowKey],
      ["PEXPIRE", windowKey, String(windowMs)],
    ]),
  });
  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  const [incr] = await res.json();
  return Number(incr.result) > limit;
}

// Returns true when `key` has gone over `limit` requests in the current window.
export async function isRateLimited(key, limit, windowMs) {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return await redisLimited(key, limit, windowMs);
    } catch (err) {
      console.error("Rate limiter falling back to memory:", err.message);
    }
  }
  return memoryLimited(key, limit, windowMs);
}

// Client IP. Vercel sets x-real-ip and overwrites x-forwarded-for, so neither
// can be spoofed by the visitor there.
export function getClientIp(req) {
  return (
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}
