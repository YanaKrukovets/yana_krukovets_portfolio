import {
  checkPassword,
  setSessionCookie,
  clearSessionCookie,
  verifyAdmin,
} from "../../lib/adminAuth";

// Admin auth endpoint for the analytics dashboard.
//   GET    -> { authenticated: boolean }   (used by the page on load)
//   POST   -> { password }  sets the session cookie on success
//   DELETE -> logout (clears the cookie)
export default function handler(req, res) {
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

  if (!checkPassword(req.body?.password)) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  setSessionCookie(res);
  return res.status(200).json({ ok: true });
}
