import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client built from the service-role key.
// The service-role key bypasses Row Level Security, so this MUST never be
// imported into client-side code. The browser talks to /api/track instead.
//
// Mirrors the lazy-init pattern of `genAI` in pages/api/chat.js: if the env
// vars are missing we return null so the build/runtime never crashes — callers
// degrade gracefully (e.g. /api/track returns 204 silently).
let client = null;

export function supabaseAdmin() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
