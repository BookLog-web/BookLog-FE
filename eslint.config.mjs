import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'next/core-web-vitals',
    'next/typescript',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ),
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/no-named-as-default': 0,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-undef': 'off',
      'dot-notation': 'error',
      'import/no-unresolved': 'error',
      'import/named': 'off',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/export': 'warn',
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
];

export default eslintConfig;