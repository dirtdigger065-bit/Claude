import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'public/bid-builder'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Only the long-standing classic hook rules — eslint-plugin-react-hooks
      // v7's "recommended" config also bundles the newer React Compiler
      // rules (immutability, preserve-manual-memoization, etc.), which flag
      // ordinary "const handler declared below the effect that calls it"
      // patterns used throughout this codebase. Not worth a sweeping
      // reorder of pre-existing components for this rebuild.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      // Best-effort `try { ... } catch {}` (silently ignore a failed fetch)
      // is an intentional, recurring pattern in this codebase.
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-useless-assignment': 'off',
    },
  }
);
