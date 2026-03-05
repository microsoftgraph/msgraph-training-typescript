// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// cSpell:ignore ganchev

import { defineConfig } from 'eslint/config';

import tseslint from 'typescript-eslint';
import eslintPrettierRecommended from 'eslint-plugin-prettier/recommended';
import header from '@tony.ganchev/eslint-plugin-header';

export default defineConfig(
  {
    ignores: ['**/dist'],
  },
  tseslint.configs.recommended,
  eslintPrettierRecommended,
  {
    files: ['**/**.{ts,js}'],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 6,
      sourceType: 'module',
    },

    plugins: {
      header,
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'header/header': [
        'error',
        'line',
        [
          ' Copyright (c) Microsoft Corporation.',
          ' Licensed under the MIT license.',
        ],
        2,
      ],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          jsxSingleQuote: true,
          endOfLine: 'auto',
          printWidth: 80,
        },
      ],
    },
  },
);
