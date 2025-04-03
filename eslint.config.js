// #region vendor
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
// #endregion
// #region internal
// #endregion

const rules = {};

const config = [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    rules: rules,
  },
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
      },
    },
    rules: rules,
  },
];

export default config;
