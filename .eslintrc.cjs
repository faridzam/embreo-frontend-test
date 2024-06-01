module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jest: true,
    NodeJS: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
    "plugin:react/recommended",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off"
  },
}
