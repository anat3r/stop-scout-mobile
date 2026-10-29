// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    rules: {
      'react/no-unescaped-entities': ['error', { forbid: ['>', '"', '}'] }],
    },
  },
  {
    files: ['components/useClientOnlyValue.web.ts'],
    // The Expo template intentionally switches from the server value after hydration.
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
