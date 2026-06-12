// @ts-check
const { defineConfig, devices } = require("@playwright/test");

// Override with `PORT=3105 npx playwright test` if another app already occupies 3000 —
// reuseExistingServer would otherwise silently run the suite against the wrong site.
const PORT = process.env.PORT || 3000;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    headless: true,
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 60000,
  },
});
