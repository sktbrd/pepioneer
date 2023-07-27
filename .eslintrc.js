/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["sznm/react", "plugin:react/jsx-runtime"],
  rules: {
    // Add the rule to ignore unused variables
    'no-unused-vars': ['error', { 'varsIgnorePattern': '^_' }],

    // Add the rule for consistent type imports
    '@typescript-eslint/consistent-type-imports': 'error',
    "prettier/prettier": "off"

  }
};
