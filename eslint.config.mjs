import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '**/node_modules',
    '**/build',
    '.github',
    '.vscode',
    'public',
    '**/.eslintrc.json',
    '**/.prettierrc.json',
    '**/react-table-config.d.ts',
    '**/jsconfig.json',
    '**/README.md',
    '**/package.json',
    '**/yarn.lock',
    '**/.next',
  ]),
  {
    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'next/core-web-vitals',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'plugin:sonarjs/recommended',
        'plugin:promise/recommended',
        'plugin:@tanstack/eslint-plugin-query/recommended',
      ),
    ),

    plugins: {
      'unused-imports': unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/prefer-immediate-return': 'off',
      'no-restricted-imports': 'off',
      'linebreak-style': 'off',
      'react/prop-types': 'off',
      'no-debugger': 'off',
      'arrow-body-style': ['error', 'as-needed'],

      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'import/order': 'off',
      'import/default': 'off',
      'import/prefer-default-export': 'off',
      'import/no-named-as-default-member': 'off',
      'promise/no-return-wrap': 'off',
      'promise/always-return': 'off',
      'promise/no-promise-in-callback': 'off',
      'import/no-named-as-default': 'off',
      'promise/prefer-await-to-then': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@next/next/no-html-link-for-pages': 'off',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'error',
      'jsx-a11y/anchor-is-valid': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      'prettier/prettier': [
        'error',
        {
          usePrettierrc: true,
          endOfLine: 'auto',
        },
      ],
    },
  },
]);
