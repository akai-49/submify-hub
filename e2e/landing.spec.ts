import { expect, test } from "@playwright/test";
import { stubSupabase } from "./supabase-stub";

test.describe("landing page", () => {
  test.beforeEach(async ({ page }) => {
    await stubSupabase(page);
  });

  test("renders the hero, nav and footer with SEO metadata", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/");

    await expect(page).toHaveTitle(/Agency\.AI/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /https?:\/\//);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og\.png$/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Structured data must be valid JSON, not just present.
    const ldJson = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(() => JSON.parse(ldJson ?? "")).not.toThrow();

    expect(consoleErrors, `console errors: ${consoleErrors.join(" | ")}`).toHaveLength(0);
  });

  test("in-page nav anchors scroll to real sections", async ({ page }) => {
    await page.goto("/");

    for (const id of ["services", "process", "portfolio", "about", "contact"]) {
      await expect(page.locator(`#${id}`), `#${id} should exist`).toHaveCount(1);
    }

    const startY = await page.evaluate(() => window.scrollY);
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Portfolio" }).click();
    await expect
      .poll(async () => page.evaluate(() => window.scrollY), { timeout: 5000 })
      .toBeGreaterThan(startY);
  });

  test("header gains its scrolled treatment after scrolling", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    await expect(header).not.toHaveClass(/backdrop-blur-xl/);

    await page.mouse.wheel(0, 600);
    await expect(header).toHaveClass(/backdrop-blur-xl/);
  });

  test("chatbot lazy-loads and responds", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /toggle chat/i }).click();
    await expect(page.getByText(/how can i help you today/i)).toBeVisible();

    await page.getByPlaceholder(/type your message/i).fill("Hello");
    await page.getByPlaceholder(/type your message/i).press("Enter");
    await expect(page.getByText("Hello", { exact: true })).toBeVisible();
  });
});
