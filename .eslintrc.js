module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
