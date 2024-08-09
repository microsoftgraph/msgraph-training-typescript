// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import globals from 'globals';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintTypeScript from '@typescript-eslint/eslint-plugin';
import eslintPrettierRecommended from 'eslint-plugin-prettier/recommended';
import header from 'eslint-plugin-header';
header.rules.header.meta.schema = false;

export default [
  {
    ignores: ['**/build'],
  },
  js.configs.recommended,
  eslintPrettierRecommended,
  {
    files: ['**.{ts,mjs}'],

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    plugins: {
      eslintTypeScript,
      header,
    },

    rules: {
      'header/header': [
        'error',
        'line',
        [
          ' Copyright (c) Microsoft Corporation.',
          ' Licensed under the MIT license.',
        ],
      ],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          endOfLine: 'auto',
          printWidth: 80,
        },
      ],
    },
  },
];
