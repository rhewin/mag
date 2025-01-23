import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 2022, // Modern JS syntax support
        sourceType: 'module', // ESM modules
      },
    },
    ignores: ['node_modules/', 'dist/', 'build/', '*.min.js'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    extends: ['plugin:prettier/recommended'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error', // Custom TypeScript rules can be added
      'no-console': 'warn', // Warn for console statements
    },
  },
];
