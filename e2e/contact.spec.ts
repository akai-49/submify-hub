import { expect, test } from "@playwright/test";
import { stubSupabase } from "./supabase-stub";

test.describe("contact + intake submission", () => {
  test("rejects an empty contact form without writing", async ({ page }) => {
    const recorder = await stubSupabase(page);
    await page.goto("/#contact");

    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText(/first name is required/i)).toBeVisible();
    expect(recorder.inserts).toHaveLength(0);
  });

  test("submits a valid contact form and confirms", async ({ page }) => {
    const recorder = await stubSupabase(page);
    await page.goto("/#contact");

    await page.getByLabel(/first name/i).fill("Ada");
    await page.getByLabel(/last name/i).fill("Lovelace");
    await page.getByLabel(/work email/i).fill("ada@example.com");
    await page.getByLabel(/project details/i).fill("We need a marketing site and an admin panel.");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText(/we'll be in touch/i)).toBeVisible();
    await expect.poll(() => recorder.inserts.length).toBe(1);
    expect(recorder.inserts[0]).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "We need a marketing site and an admin panel.",
    });
  });

  test("shows an error toast when the write fails", async ({ page }) => {
    await stubSupabase(page, { failInserts: true });
    await page.goto("/#contact");

    await page.getByLabel(/first name/i).fill("Ada");
    await page.getByLabel(/work email/i).fill("ada@example.com");
    await page.getByLabel(/project details/i).fill("This request is going to fail.");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText(/couldn't send your message/i)).toBeVisible();
  });

  test("/submit writes an intake row", async ({ page }) => {
    const recorder = await stubSupabase(page);
    await page.goto("/submit");

    await page.getByLabel(/^name/i).fill("Grace Hopper");
    await page.getByLabel(/^email/i).fill("grace@example.com");
    await page.getByLabel(/^phone/i).fill("+1 202 555 0173");
    await page.getByLabel(/^message/i).fill("Interested in an AI automation pilot.");
    await page.getByRole("button", { name: /^submit$/i }).click();

    await expect(page.getByText(/thanks for reaching out/i)).toBeVisible();
    await expect.poll(() => recorder.inserts.length).toBe(1);
    expect(recorder.inserts[0]).toMatchObject({
      name: "Grace Hopper",
      email: "grace@example.com",
    });
  });

  test("/submit blocks an invalid email client-side", async ({ page }) => {
    const recorder = await stubSupabase(page);
    await page.goto("/submit");

    await page.getByLabel(/^name/i).fill("Grace Hopper");
    await page.getByLabel(/^email/i).fill("definitely-not-an-email");
    await page.getByLabel(/^message/i).fill("Should never reach the database.");
    await page.getByRole("button", { name: /^submit$/i }).click();

    await expect(page.getByText(/invalid email/i)).toBeVisible();
    expect(recorder.inserts).toHaveLength(0);
  });
});
