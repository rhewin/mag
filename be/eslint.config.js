import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["node_modules/", "dist/", "build/"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // JavaScript recommended rules
      ...tseslint.configs.recommended.rules, // TypeScript recommended rules
      ...eslintConfigPrettier.rules, // Disables ESLint rules that conflict with Prettier

      "prettier/prettier": "error", // Ensures Prettier formatting is enforced
      "no-unused-vars": "warn",
      "no-console": "off",
      "comma-dangle": "off",
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
