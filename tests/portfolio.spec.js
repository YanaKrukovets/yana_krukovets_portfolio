// @ts-check
const { test, expect } = require("@playwright/test");

const BASE = "http://localhost:3000";

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet:  { width: 768,  height: 1024 },
  mobile:  { width: 375,  height: 812 },
};

async function goto(page) {
  await page.goto(BASE, { waitUntil: "networkidle" });
}

// ─── SEO ────────────────────────────────────────────────────────────────────
test.describe("SEO", () => {
  test("has title", async ({ page }) => {
    await goto(page);
    await expect(page).toHaveTitle(/Yana Krukovets/i);
  });

  test("has meta description", async ({ page }) => {
    await goto(page);
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc).toBeTruthy();
    expect(desc.length).toBeGreaterThan(20);
  });

  test("og:image is https", async ({ page }) => {
    await goto(page);
    const ogImg = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImg).toBeTruthy();
    expect(ogImg).not.toMatch(/^http:/);
  });

  test("twitter:image is https", async ({ page }) => {
    await goto(page);
    const twImg = await page.locator('meta[name="twitter:image"]').getAttribute("content");
    expect(twImg).toBeTruthy();
    expect(twImg).not.toMatch(/^http:/);
  });

  test("og:url is https", async ({ page }) => {
    await goto(page);
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(ogUrl).toMatch(/^https:/);
  });

  test("exactly one h1 on page", async ({ page }) => {
    await goto(page);
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("html element has lang attribute", async ({ page }) => {
    await goto(page);
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en");
  });

  test("has JSON-LD Person structured data", async ({ page }) => {
    await goto(page);
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(ld);
    expect(parsed["@type"]).toBe("Person");
    expect(parsed.name).toBe("Yana Krukovets");
    expect(Array.isArray(parsed.sameAs)).toBeTruthy();
  });

  test("has preconnect for Google Fonts", async ({ page }) => {
    await goto(page);
    const preconnect = page.locator('link[rel="preconnect"][href*="fonts.googleapis.com"]');
    await expect(preconnect).toHaveCount(1);
  });

  test("og:image has width and height meta tags", async ({ page }) => {
    await goto(page);
    const w = await page.locator('meta[property="og:image:width"]').getAttribute("content");
    const h = await page.locator('meta[property="og:image:height"]').getAttribute("content");
    expect(Number(w)).toBeGreaterThanOrEqual(1200);
    expect(Number(h)).toBeGreaterThanOrEqual(630);
  });

  test("page has header, main, footer landmarks", async ({ page }) => {
    await goto(page);
    expect(await page.locator("header").count()).toBe(1);
    expect(await page.locator("main").count()).toBe(1);
    expect(await page.locator("footer").count()).toBe(1);
  });
});

// ─── Accessibility ──────────────────────────────────────────────────────────
test.describe("Accessibility", () => {
  test("skip-to-main link is first focusable element", async ({ page }) => {
    await goto(page);
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => document.activeElement?.className ?? "");
    expect(focused).toContain("skip-to-main-content");
  });

  test("logo image has alt text", async ({ page }) => {
    await goto(page);
    const alt = await page.locator("nav img").first().getAttribute("alt");
    expect(alt).toBeTruthy();
  });

  test("profile photo has alt text", async ({ page }) => {
    await goto(page);
    const alt = await page.locator(".profile-img").getAttribute("alt");
    expect(alt).toBeTruthy();
  });

  test("all project images have alt text", async ({ page }) => {
    await goto(page);
    await page.locator("#projects").scrollIntoViewIfNeeded();
    const imgs = page.locator("#projects img");
    const count = await imgs.count();
    for (let i = 0; i < count; i++) {
      const alt = await imgs.nth(i).getAttribute("alt");
      expect(alt, `project image ${i} missing alt`).toBeTruthy();
    }
  });

  test("form inputs have associated labels", async ({ page }) => {
    await goto(page);
    expect(await page.locator('label[for="name"]').count()).toBe(1);
    expect(await page.locator('label[for="email"]').count()).toBe(1);
    expect(await page.locator('label[for="message"]').count()).toBe(1);
  });

  test("CV download has aria-label", async ({ page }) => {
    await goto(page);
    const label = await page.locator("a[download]").getAttribute("aria-label");
    expect(label).toBeTruthy();
  });

  test("hamburger has aria-expanded attribute", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await goto(page);
    const hamburger = page.locator("#nav-button");
    const expanded = await hamburger.getAttribute("aria-expanded");
    expect(["true", "false"]).toContain(expanded);
  });

  test("social links have aria-label", async ({ page }) => {
    await goto(page);
    const socialLinks = page.locator('a[aria-label*="Github"], a[aria-label*="linkedin"]');
    const count = await socialLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      expect(await socialLinks.nth(i).getAttribute("aria-label")).toBeTruthy();
    }
  });
});

// ─── Responsiveness ─────────────────────────────────────────────────────────
for (const [name, vp] of Object.entries(VIEWPORTS)) {
  test.describe(`Responsive — ${name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: vp });

    test("no horizontal overflow", async ({ page }) => {
      await goto(page);
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
    });

    test("h1 is visible", async ({ page }) => {
      await goto(page);
      await expect(page.locator("h1")).toBeVisible();
    });

    test("nav is visible", async ({ page }) => {
      await goto(page);
      await expect(page.locator("nav")).toBeVisible();
    });

    test("#about section renders", async ({ page }) => {
      await goto(page);
      await page.locator("#about").scrollIntoViewIfNeeded();
      await expect(page.locator("#about")).toBeVisible();
    });

    test("#projects section renders", async ({ page }) => {
      await goto(page);
      await page.locator("#projects").scrollIntoViewIfNeeded();
      await expect(page.locator("#projects")).toBeVisible();
    });

    test("contact form renders", async ({ page }) => {
      await goto(page);
      await page.locator("#contact").scrollIntoViewIfNeeded();
      await expect(page.locator("form")).toBeVisible();
    });
  });
}

// ─── Mobile-specific ────────────────────────────────────────────────────────
test.describe("Mobile nav", () => {
  test.use({ viewport: VIEWPORTS.mobile });

  test("hamburger opens mobile nav", async ({ page }) => {
    await goto(page);
    await page.locator("#nav-button").click();
    await expect(page.locator("#nav-button")).toHaveAttribute("aria-expanded", "true");
  });

  test("clicking nav link closes mobile menu", async ({ page }) => {
    await goto(page);
    await page.locator("#nav-button").click();
    await page.locator(".mobile-nav-item").first().click();
    const expanded = await page.locator("#nav-button").getAttribute("aria-expanded");
    expect(expanded).toBe("false");
  });

  test("project swiper visible on mobile", async ({ page }) => {
    await goto(page);
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await expect(page.locator(".projects-swiper").first()).toBeVisible();
  });
});

// ─── Desktop-specific ────────────────────────────────────────────────────────
test.describe("Desktop layout", () => {
  test.use({ viewport: VIEWPORTS.desktop });

  test("desktop nav links visible (not hamburger-only)", async ({ page }) => {
    await goto(page);
    await expect(page.locator(".desktop-nav")).toBeVisible();
  });

  test("projects grid visible on desktop (not swiper)", async ({ page }) => {
    await goto(page);
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await expect(page.locator(".projects-container").first()).toBeVisible();
  });

  test("two CTA buttons visible in hero", async ({ page }) => {
    await goto(page);
    const btns = page.locator(".my-work-btn");
    await expect(btns.first()).toBeVisible();
    expect(await btns.count()).toBe(2);
  });
});

// ─── Content integrity ────────────────────────────────────────────────────────
test.describe("Content", () => {
  test("skills grid has at least 6 items", async ({ page }) => {
    await goto(page);
    await page.locator("#about").scrollIntoViewIfNeeded();
    expect(await page.locator(".skill-item").count()).toBeGreaterThanOrEqual(6);
  });

  test("timeline has at least 3 experience entries", async ({ page }) => {
    await goto(page);
    expect(await page.locator(".timeline-item").count()).toBeGreaterThanOrEqual(3);
  });

  test("CV download link points to a PDF", async ({ page }) => {
    await goto(page);
    const href = await page.locator("a[download]").getAttribute("href");
    expect(href).toMatch(/\.pdf$/i);
  });

  test("typewriter text cycles", async ({ page }) => {
    await goto(page);
    const initial = await page.locator(".typewriter-text").innerText();
    await page.waitForTimeout(4000);
    const later = await page.locator(".typewriter-text").innerText();
    expect(later).not.toBe(initial);
  });
});
