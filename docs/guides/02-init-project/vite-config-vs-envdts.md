# vite.config.js 与 vite-env.d.ts 的区别

## 1. vite.config.js 是什么？

- **作用**：Vite 的主配置文件，用于配置开发服务器、插件、构建选项、路径别名等。
- **内容**：包含 Vite 相关的 JS/TS 配置代码。
- **常见用途**：
  - 配置插件（如 React、Vue 等）
  - 配置路径别名（alias）
  - 配置代理、环境变量、构建输出等
- **示例**：
  ```js
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  })
  ```
- **本质**：Vite 的“功能和行为”配置文件。

---

## 2. vite-env.d.ts 是什么？

- **作用**：TypeScript 类型声明文件，为 Vite 项目提供类型支持。
- **内容**：包含全局类型声明、静态资源类型声明等。
- **常见用途**：
  - 引入 Vite 的全局类型（如 `import.meta.env`）
  - 声明静态资源类型（如 `.svg`、`.png` 等）
- **示例**：
  ```ts
  /// <reference types="vite/client" />
  declare module '*.svg' {
    const src: string
    export default src
  }
  ```
- **本质**：Vite + TypeScript 项目的“类型提示和类型安全”文件。

---

## 3. 总结对比

| 文件            | 主要作用           | 影响范围         | 典型内容           |
|-----------------|--------------------|------------------|--------------------|
| vite.config.js  | 功能/行为配置      | Vite 构建/开发   | 插件、别名、代理等 |
| vite-env.d.ts   | 类型声明/类型提示  | TypeScript 检查   | 类型声明、资源声明 |

- **vite.config.js** 决定“Vite 怎么运行”。
- **vite-env.d.ts** 决定“TypeScript 怎么理解 Vite 项目中的类型”。

---

*最后更新时间：2024年* 