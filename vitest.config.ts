import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// Standalone config on purpose. The app's vite.config.ts wraps
// @lovable.dev/vite-tanstack-config, which pulls in the TanStack Start and
// Cloudflare Workers plugins — neither can run under a jsdom test environment.
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // Playwright specs live in e2e/ and are driven by @playwright/test, not vitest.
    exclude: ["node_modules", "dist", "e2e"],
  },
});
