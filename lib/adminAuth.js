import crypto from "crypto";

// Lightweight signed-cookie session for the analytics dashboard. No DB, no
// third-party auth — a single shared password (ANALYTICS_ADMIN_PASSWORD) grants
// access, and the session is an HMAC-signed token in an httpOnly cookie signed
// with ANALYTICS_SESSION_SECRET.

const COOKIE_NAME = "analytics_admin";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function secret() {
  return process.env.ANALYTICS_SESSION_SECRET || "";
}

function sign(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

// Token format: "<expiryMs>.<signature>"
function makeToken() {
  const expiry = String(Date.now() + SESSION_TTL_MS);
  return `${expiry}.${sign(expiry)}`;
}

function tokenValid(token) {
  if (!token || !secret()) return false;
  const [expiry, sig] = token.split(".");
  if (!expiry || !sig) return false;
  const expected = sign(expiry);
  // Constant-time compare to avoid timing leaks.
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  return Date.now() < Number(expiry);
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  return Object.fromEntries(
    header
      .split(";")
      .map((c) => c.trim().split("="))
      .filter(([k]) => k)
      .map(([k, ...v]) => [k, decodeURIComponent(v.join("="))])
  );
}

// True if the request carries a valid, unexpired admin session cookie.
export function verifyAdmin(req) {
  const cookies = parseCookies(req);
  return tokenValid(cookies[COOKIE_NAME]);
}

// Returns true if the supplied password matches the configured admin password.
export function checkPassword(password) {
  const expected = process.env.ANALYTICS_ADMIN_PASSWORD || "";
  if (!expected || typeof password !== "string") return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function setSessionCookie(res) {
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  res.setHeader("Set-Cookie", [
    `${COOKIE_NAME}=${encodeURIComponent(makeToken())}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Strict; Secure`,
  ]);
}

export function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", [
    `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`,
  ]);
}
