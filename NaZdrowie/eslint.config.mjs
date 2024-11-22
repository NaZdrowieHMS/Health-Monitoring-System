import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import stylisticJs from "@stylistic/eslint-plugin-js";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "@stylistic/js": stylisticJs,
      prettier: pluginPrettier,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@stylistic/js/jsx-quotes": ["warn", "prefer-double"],
      "@stylistic/js/quotes": ["warn", "double"],
      "react/react-in-jsx-scope": "off",
      "react/jsx-key": "off",
      "prettier/prettier": ["warn", { printWidth: 80 }],
    },
  },
];
