module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/jsx-uses-react": "off", // only if using React version 17+
    "react/react-in-jsx-scope": "off", // only if using React version 17+
    "react-hooks/rules-of-hooks": "error", // if using hooks
    "react-hooks/exhaustive-deps": "warn", // if using hooks
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
}
