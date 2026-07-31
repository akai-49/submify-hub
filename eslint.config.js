import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // react-refresh/only-export-components flags files that export both a component and
    // something else. It is a dev-time HMR nicety, not a correctness rule, and every hit
    // is an intentional pattern: vendored shadcn/ui primitives export their cva variants,
    // the router exports getRouter beside its error component, and the auth module exports
    // its provider beside the useAuth hook. Splitting them would add files for no gain.
    files: ["src/components/ui/**/*.tsx", "src/router.tsx", "src/lib/auth-context.tsx"],
    rules: { "react-refresh/only-export-components": "off" },
  },
  {
    files: ["src/**/*.test.{ts,tsx}", "src/test/**", "e2e/**", "*.config.{ts,js}"],
    rules: { "@typescript-eslint/no-explicit-any": "off" },
  },
  eslintPluginPrettier,
);
