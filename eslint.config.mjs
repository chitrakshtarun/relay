import expoConfig from "eslint-config-expo/flat.js";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  expoConfig,
  eslintConfigPrettier,
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
      "react-hooks/exhaustive-deps": "off",
    },
  },
]);
