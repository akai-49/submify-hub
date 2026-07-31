import { expect, test } from "@playwright/test";
import { stubSupabase } from "./supabase-stub";

test.describe("authentication", () => {
  test("login page renders and is reachable from the header", async ({ page }) => {
    await stubSupabase(page);
    await page.goto("/");

    await page.getByRole("link", { name: /log in/i }).first().click();

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible();
  });

  test("surfaces the provider error on bad credentials", async ({ page }) => {
    await stubSupabase(page, {
      authError: { error: "invalid_grant", error_description: "Invalid login credentials" },
    });
    await page.goto("/login");

    await page.getByLabel(/email/i).fill("nobody@example.com");
    await page.getByLabel(/password/i).fill("wrong-password-here");
    await page.getByRole("button", { name: /^sign in$/i }).click();

    await expect(page.getByText(/invalid login credentials/i)).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("signs in with valid credentials and lands on the dashboard", async ({ page }) => {
    const recorder = await stubSupabase(page);
    await page.goto("/login");

    await page.getByLabel(/email/i).fill("ada@example.com");
    await page.getByLabel(/password/i).fill("correct-horse-battery");
    await page.getByRole("button", { name: /^sign in$/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect.poll(() => recorder.logins.length).toBeGreaterThan(0);
  });

  test("blocks a short password at signup before calling the API", async ({ page }) => {
    const recorder = await stubSupabase(page);
    await page.goto("/signup");

    await page.getByLabel(/full name/i).fill("Ada Lovelace");
    await page.getByLabel(/email/i).fill("ada@example.com");
    await page.getByLabel(/password/i).fill("short");
    await page.getByRole("button", { name: /create account/i }).click();

    await expect(page.getByText(/at least 8 characters/i).first()).toBeVisible();
    expect(recorder.signups).toHaveLength(0);
  });

  test("creates an account and redirects to the dashboard", async ({ page }) => {
    const recorder = await stubSupabase(page);
    await page.goto("/signup");

    await page.getByLabel(/full name/i).fill("Ada Lovelace");
    await page.getByLabel(/email/i).fill("ada@example.com");
    await page.getByLabel(/password/i).fill("correct-horse-battery");
    await page.getByRole("button", { name: /create account/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect.poll(() => recorder.signups.length).toBe(1);
  });

  test("navigates between login and signup", async ({ page }) => {
    await stubSupabase(page);
    await page.goto("/login");

    await page.getByRole("link", { name: /sign up/i }).click();
    await expect(page).toHaveURL(/\/signup/);

    await page.getByRole("link", { name: /log in/i }).last().click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("/admin is served by the server instead of redirecting during SSR", async ({ request }) => {
    // Regression guard. The old beforeLoad called supabase.auth.getSession() during SSR,
    // where the browser client has no session storage, so the *server* answered every
    // direct hit on /admin with a redirect to /login — admins included. A raw request
    // with redirects disabled is what distinguishes that from the client-side guard.
    const response = await request.get("/admin", { maxRedirects: 0 });

    expect(response.status()).toBe(200);
    expect(response.headers()["location"]).toBeUndefined();
  });

  test("an anonymous visitor to /admin still ends up at /login", async ({ page }) => {
    // Client-side guard: /admin sends non-admins to /dashboard, which sends
    // signed-out users on to /login.
    await stubSupabase(page);
    await page.goto("/admin");

    await expect(page).toHaveURL(/\/login/);
  });
});
