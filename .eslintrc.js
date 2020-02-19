module.exports = {
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  rules: {
    "no-console": "off",
    "prefer-destructuring": "off",
    "no-underscore-dangle": "off",
    camelcase: "off"
  },
  env: {
    browser: true
  }
};
