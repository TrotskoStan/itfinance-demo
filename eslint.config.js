import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import("eslint").Linter.Config} */
export default {
  files: ['src/**/*.{ts,js}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    "prefer-const": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-multiple-empty-lines": ["error", { "max": 1 }]
  },
};
