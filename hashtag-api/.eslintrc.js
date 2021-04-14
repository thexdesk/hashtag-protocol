module.exports = {
  root: true,
  env: {
    // This section will be used to determine which APIs are available to us
    // (i.e are we running in a browser environment or a node.js env)
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  plugins: ["prettier", "eslint-plugin-html"],
  extends: [
    // use the recommended rule set for both plain javascript and vue
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    // we should always disable console logs and debugging in production
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
