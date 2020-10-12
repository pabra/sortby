module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  env: {
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/no-explicit-any': 0,

    // ts
    '@typescript-eslint/explicit-module-boundary-types': 2,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 2,

    // js
    'no-shadow': 2,
    'import/no-unused-modules': [2, { unusedExports: true }],
    eqeqeq: 2,
  },
};
