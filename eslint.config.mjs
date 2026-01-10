import { createRequire } from "module";
import { dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import de la configuration Next.js (CommonJS)
const nextConfig = require("eslint-config-next/core-web-vitals");

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
    ],
  },
  ...nextConfig,
];

