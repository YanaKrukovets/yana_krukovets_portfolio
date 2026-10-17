// Classifies where a visit came from, so the dashboard can show how much traffic
// arrives from AI assistants versus search, social, and other sites.
//
// Two signals are used: the HTTP referrer, and a utm_source query parameter.
// The second matters for AI assistants — several of them strip the referrer but
// append ?utm_source=<their domain> to the links they cite.

const OWN_HOSTS = new Set(["yanakrukovets.com", "www.yanakrukovets.com"]);

// Each pattern is matched against the referrer hostname or the utm_source value
// (both lowercased). A bare word ("chatgpt") matches any dot-separated label, so it
// covers chatgpt.com, www.chatgpt.com, and utm_source=chatgpt alike. A pattern
// containing a dot ("x.com") must match the domain itself or a parent of it.
const AI_SOURCES = [
  { name: "ChatGPT", match: ["chatgpt", "openai"] },
  { name: "Perplexity", match: ["perplexity"] },
  { name: "Claude", match: ["claude"] },
  { name: "Gemini", match: ["gemini", "bard"] },
  { name: "Copilot", match: ["copilot"] },
  { name: "Meta AI", match: ["meta.ai"] },
  // Meta's Muse agent. muse.ai is also an unrelated video host, so a stray visit from it may land here.
  { name: "Meta Muse", match: ["muse.ai"] },
  { name: "Grok", match: ["grok", "x.ai"] },
  { name: "DeepSeek", match: ["deepseek"] },
  { name: "Mistral", match: ["mistral"] },
  { name: "You.com", match: ["you.com"] },
  { name: "Phind", match: ["phind"] },
];

const SEARCH_SOURCES = [
  { name: "Google", match: ["google"] },
  { name: "Bing", match: ["bing"] },
  { name: "DuckDuckGo", match: ["duckduckgo"] },
  { name: "Yahoo", match: ["yahoo"] },
  { name: "Yandex", match: ["yandex"] },
  { name: "Brave Search", match: ["search.brave.com"] },
  { name: "Ecosia", match: ["ecosia"] },
  { name: "Kagi", match: ["kagi"] },
];

const SOCIAL_SOURCES = [
  { name: "LinkedIn", match: ["linkedin", "lnkd.in"] },
  { name: "X / Twitter", match: ["twitter", "x.com", "t.co"] },
  { name: "Facebook", match: ["facebook", "fb.com"] },
  { name: "Instagram", match: ["instagram"] },
  { name: "Reddit", match: ["reddit"] },
  { name: "Pinterest", match: ["pinterest"] },
  { name: "GitHub", match: ["github"] },
  { name: "YouTube", match: ["youtube", "youtu.be"] },
];

function matches(value, pattern) {
  if (!pattern.includes(".")) return value.split(".").includes(pattern);
  return value === pattern || value.endsWith(`.${pattern}`);
}

function lookup(value, sources) {
  return sources.find((s) => s.match.some((pattern) => matches(value, pattern)))?.name || null;
}

function hostnameOf(referrer) {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function classifyValue(value) {
  // AI is checked first: gemini.google.com would otherwise count as a Google search.
  const ai = lookup(value, AI_SOURCES);
  if (ai) return { channel: "ai", name: ai };
  const search = lookup(value, SEARCH_SOURCES);
  if (search) return { channel: "search", name: search };
  const social = lookup(value, SOCIAL_SOURCES);
  if (social) return { channel: "social", name: social };
  return null;
}

// Returns { channel: "ai" | "search" | "social" | "referral" | "direct", name }.
export function classifySource({ referrer, utmSource } = {}) {
  const utm = typeof utmSource === "string" ? utmSource.trim().toLowerCase() : "";
  if (utm) {
    return classifyValue(utm) || { channel: "referral", name: utm };
  }

  const host = hostnameOf(referrer);
  if (!host || OWN_HOSTS.has(host)) return { channel: "direct", name: null };

  return classifyValue(host) || { channel: "referral", name: host.replace(/^www\./, "") };
}
