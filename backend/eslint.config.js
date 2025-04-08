import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.node,
        process: true,

      }
    },
    rules: {
      "no-unused-vars": "warn"
    }
  },
  pluginJs.configs.recommended,
];

