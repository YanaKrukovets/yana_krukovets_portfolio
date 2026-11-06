const path = require("path");

const isDev = process.env.NODE_ENV !== "production";

// Content-Security-Policy: limits where the browser may load scripts, styles,
// fonts and data from, so an injected <script src="evil.com"> won't run.
// 'unsafe-inline' for scripts is needed because Next.js (Pages Router) adds
// small inline scripts and a per-request nonce would require middleware.
// 'unsafe-eval' is only needed by the dev server's hot reload.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://formspree.io",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "form-action 'self' https://formspree.io",
  "object-src 'none'",
  "base-uri 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["swiper"],
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
    localeDetection: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};
