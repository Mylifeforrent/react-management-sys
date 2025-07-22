import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // 允许开发时使用 console，生产建议设为 'warn' 或 'error'
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      // 未使用变量报错，保持代码整洁
      'no-unused-vars': 'error',

      // 禁止 debugger
      'no-debugger': 'error',

      // 禁止 var，强制用 let/const
      'no-var': 'error',

      // 关闭 React 17+ 必须引入 React 的校验
      'react/react-in-jsx-scope': 'off',

      // TypeScript 相关规则
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // 如果你用 TS，建议只开启 TS 版本的 unused-vars
    },
  },
])