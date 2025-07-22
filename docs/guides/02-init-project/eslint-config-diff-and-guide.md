# `eslint.config.js` 与 `.eslintrc.cjs` 配置文件对比与迁移指南

本指南对比分析了新式 `eslint.config.js` 与传统 `.eslintrc.cjs` 的区别，并说明如何让 `eslint.config.js` 实现与 `.eslintrc.cjs` 一致的效果，适合 React 入门开发者参考。

---

## 1. 配置文件格式与加载方式

|  | `eslint.config.js` | `.eslintrc.cjs` |
|---|--------------------|-----------------|
| 配置风格 | 新式（Flat Config） | 传统（ESLint RC） |
| 文件类型 | JS/TS/JSON/YAML | JS/TS/JSON/YAML |
| 导出方式 | `export default` (ESM) | `module.exports` (CommonJS) |
| 加载方式 | 需用 `eslint --config` 指定或新版 ESLint 自动识别 | 自动识别，无需特殊参数 |
| 结构 | 配置为数组/对象，支持多段合并 | 单一对象，层级结构 |
| 未来趋势 | 官方推荐，功能更强 | 兼容性好，历史项目多 |

---

## 2. 主要配置内容对比

### 2.1 传统 `.eslintrc.cjs` 示例

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react-refresh'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-debugger': 'error',
    'no-var': 'error',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
}
```

### 2.2 新式 `eslint.config.js` 示例

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
```

---

## 3. 主要区别与分析

| 方面 | `.eslintrc.cjs` | `eslint.config.js` |
|------|-----------------|--------------------|
| 配置风格 | 传统 RC | Flat Config（新） |
| 语法 | CommonJS | ESM（import/export） |
| 继承方式 | `extends` 字符串 | `extends` 对象/变量 |
| 插件用法 | `plugins` + `extends` | 直接 `extends` 插件配置对象 |
| 作用范围 | 全局 | 可分段指定 files 匹配 |
| 忽略文件 | `.eslintignore` | `globalIgnores` 或 ignorePatterns |
| 生态支持 | 兼容所有插件 | 部分老插件不支持 Flat Config |
| 未来趋势 | 逐步被 Flat Config 替代 | 官方推荐 Flat Config |

### 具体分析
- **导入方式**：新式用 `import`，传统用 `require`。
- **插件与扩展**：新式直接用插件的配置对象，传统用字符串。
- **作用范围**：新式可针对不同文件类型配置不同规则。
- **忽略文件**：新式用 `globalIgnores`，传统用 `.eslintignore`。
- **TypeScript 支持**：传统配置直接用 `@typescript-eslint/parser` 和相关插件，新式需手动引入并配置。

---

## 4. 如何让 `eslint.config.js` 实现与 `.eslintrc.cjs` 一致的效果？

### 需要注意的点：
- 新式配置目前**没有直接等价的 `env` 字段**，需用 `globals` 和 `parserOptions` 配置环境。
- TypeScript 支持需引入 `@typescript-eslint/eslint-plugin` 和 `@typescript-eslint/parser`，并在 `extends` 和 `languageOptions.parser` 中配置。
- 规则需全部迁移到 `rules` 字段。
- 插件推荐用 `extends` 直接引入其配置对象。

### 示例迁移方案（伪代码，需根据实际依赖调整）：

```js
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
      'react/react-in-jsx-scope': 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      'no-debugger': 'error',
      'no-var': 'error',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
])
```

---

## 5. 总结与建议（适合 React 入门开发者）

- **新项目推荐用 `eslint.config.js`（Flat Config）**，但需确保所有插件支持新格式。
- **如需兼容老项目或插件，建议继续用 `.eslintrc.cjs`。**
- **迁移时注意 TypeScript、React、插件的配置方式差异。**
- **建议团队统一配置风格，避免混用两种格式。**

---

*最后更新时间：2024年* 