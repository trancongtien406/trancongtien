import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".codex/**",
    "seo-output/**",
  ]),
  // Khu demo (app/(demos)): các demo khôi phục trạng thái từ localStorage sau hydrate
  // (đọc trong effect để tránh lệch SSR). Hai luật React Compiler dưới đây báo mẫu đó là lỗi.
  {
    files: ["app/(demos)/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/immutability": "off",
    },
  },
]);

export default eslintConfig;
