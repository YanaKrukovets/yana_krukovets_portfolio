import {
  checkPassword,
  setSessionCookie,
  clearSessionCookie,
  verifyAdmin,
} from "../../lib/adminAuth";
import { isRateLimited, getClientIp } from "../../lib/rateLimit";

// Brute-force guard: a few login attempts per IP, then a cooldown.
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

// Admin auth endpoint for the analytics dashboard.
//   GET    -> { authenticated: boolean }   (used by the page on load)
//   POST   -> { password }  sets the session cookie on success
//   DELETE -> logout (clears the cookie)
export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ authenticated: verifyAdmin(req) });
  }

  if (req.method === "DELETE") {
    clearSessionCookie(res);
    return res.status(200).json({ ok: true });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.ANALYTICS_ADMIN_PASSWORD || !process.env.ANALYTICS_SESSION_SECRET) {
    return res.status(503).json({ error: "Admin login is not configured" });
  }

  if (await isRateLimited(`login:${getClientIp(req)}`, LOGIN_LIMIT, LOGIN_WINDOW_MS)) {
    return res.status(429).json({ error: "Too many attempts. Try again in 15 minutes." });
  }

  if (!checkPassword(req.body?.password)) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  setSessionCookie(res);
  return res.status(200).json({ ok: true });
}
