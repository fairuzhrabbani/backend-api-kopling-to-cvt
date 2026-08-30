import eslint from '@eslint/js';

export default [
  {
    ignores: ['node_modules/**', 'coverage/**', 'dist/**'],
  },

  eslint.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
