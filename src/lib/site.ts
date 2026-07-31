// Absolute origin, needed for canonical/og:url/JSON-LD — relative URLs are invalid there.
// Override per-environment with VITE_SITE_URL (no trailing slash).
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://akai.workers.dev").replace(
  /\/$/,
  "",
);

export const SITE_NAME = "Agency.AI";
export const SITE_DESCRIPTION =
  "Premium software and AI agency. Smart websites, powerful applications, and AI automation — built on React, TanStack, Supabase and Cloudflare.";

export const canonical = (path: string) => `${SITE_URL}${path}`;
