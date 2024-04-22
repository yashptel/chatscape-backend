module.exports = {
  // env: {
  //   node: true,
  //   commonjs: true,
  //   es2021: true,
  // },
  extends: ["airbnb-base", "prettier"],
  overrides: [],

  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },

  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-unused-vars": "off",
    "global-require": "off",
    "import/no-unresolved": "off",
  },
};
