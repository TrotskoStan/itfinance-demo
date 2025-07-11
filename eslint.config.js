const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "prefer-const": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-multiple-empty-lines": ["error", { "max": 1 }]
    },
  },
];



// const tsPlugin = require("@typescript-eslint/eslint-plugin");
// const tsParser = require("@typescript-eslint/parser");

// /** @type {import("eslint").Linter.Config[]} */
// module.exports = [
//   {
//     files: ["**/*.ts", "**/*.js"],
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         ecmaVersion: 2020,
//         sourceType: "module",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": tsPlugin,
//     },
//     rules: {
//       'indent': ['error', 2],
//       'semi': ['error', 'always'],
//       'no-multiple-empty-lines': ['error', { max: 1 }],
//       "prefer-const": "warn",
//       "@typescript-eslint/no-unused-vars": "warn",
//     },
//   },
// ];
