import type { Page, Route } from "@playwright/test";

/**
 * Intercepts every call to Supabase so the suite never touches a real project.
 * Without this, the contact and signup specs would write rows into whatever
 * database VITE_SUPABASE_URL points at — in CI that is production.
 */
export type StubOptions = {
  /** Force a failure response from PostgREST writes. */
  failInserts?: boolean;
  /** Rows returned by any GET (PostgREST select). */
  rows?: unknown[];
  /** Error body returned by auth endpoints instead of a session. */
  authError?: { error: string; error_description: string };
};

export type Recorder = { inserts: unknown[]; signups: unknown[]; logins: unknown[] };

export async function stubSupabase(page: Page, opts: StubOptions = {}): Promise<Recorder> {
  const recorder: Recorder = { inserts: [], signups: [], logins: [] };

  const json = (route: Route, status: number, body: unknown) =>
    route.fulfill({
      status,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify(body),
    });

  await page.route("**/*.supabase.co/**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const method = request.method();

    if (method === "OPTIONS") {
      return route.fulfill({
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-headers": "*",
          "access-control-allow-methods": "*",
        },
      });
    }

    // --- Auth ---
    if (url.pathname.includes("/auth/v1/")) {
      if (opts.authError) return json(route, 400, opts.authError);

      const body = request.postDataJSON?.() ?? {};
      if (url.pathname.includes("signup")) recorder.signups.push(body);
      if (url.pathname.includes("token")) recorder.logins.push(body);

      return json(route, 200, {
        access_token: "stub-access-token",
        refresh_token: "stub-refresh-token",
        token_type: "bearer",
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        user: {
          id: "00000000-0000-0000-0000-000000000001",
          aud: "authenticated",
          role: "authenticated",
          email: body.email ?? "stub@example.com",
          user_metadata: {},
          app_metadata: {},
          created_at: new Date().toISOString(),
        },
      });
    }

    // --- PostgREST ---
    if (url.pathname.includes("/rest/v1/")) {
      if (method === "POST") {
        recorder.inserts.push(request.postDataJSON?.() ?? null);
        if (opts.failInserts) {
          return json(route, 400, { message: "stubbed failure", code: "400" });
        }
        return json(route, 201, []);
      }
      return json(route, 200, opts.rows ?? []);
    }

    return json(route, 200, {});
  });

  return recorder;
}
