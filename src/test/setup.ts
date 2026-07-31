import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// src/integrations/supabase/client.ts throws when these are absent.
process.env.VITE_SUPABASE_URL ??= "https://test.supabase.co";
process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??= "sb_publishable_test";

// jsdom implements none of these. Radix and embla want ResizeObserver; framer-motion's
// whileInView wants IntersectionObserver.
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.IntersectionObserver ??= class {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};
globalThis.Element.prototype.scrollIntoView ??= vi.fn();

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
