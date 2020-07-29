module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["google", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "object-curly-spacing": "off",
    "quotes": ["error", "double", { allowTemplateLiterals: true }],
    "indent": ["error", 2],
  },
};
