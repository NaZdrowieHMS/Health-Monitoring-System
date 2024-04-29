module.exports = {
  root: true,
  extends: ["universe/native"],
  plugins: ["@typescript-eslint"],
  rules: {
    // Ensures props and state inside functions are always up-to-date
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-explicit-any": "error",
  },
};
