# vite-env.d.ts 文件的作用说明

## 1. vite-env.d.ts 是什么？

`vite-env.d.ts` 是 Vite 项目自动生成或推荐添加的 TypeScript 类型声明文件。

## 2. 主要作用

- **全局类型声明**：为 Vite 项目提供全局类型支持，避免类型报错。
- **引入 Vite 特有类型**：通过 `/// <reference types="vite/client" />`，让 TypeScript 识别 Vite 的全局类型（如 `import.meta.env` 等）。
- **自定义资源类型声明**：可在此文件中声明静态资源（如 `.svg`、`.png`、`.css` 等）的模块类型，方便 TypeScript 识别这些文件的导入。
- **项目根目录自动生效**：放在项目根目录下，TypeScript 会自动加载，无需手动引入。

## 3. 常见内容示例

```ts
/// <reference types="vite/client" />

declare module '*.svg' {
  const src: string
  export default src
}
```

- 第一行引入 Vite 的全局类型。
- 后续可自定义静态资源类型声明。

## 4. 为什么需要它？

- 避免 TypeScript 报“找不到模块声明”错误。
- 支持 Vite 的环境变量类型提示（如 `import.meta.env`）。
- 让编辑器获得更好的类型推断和自动补全体验。

## 5. 适合谁？

- 所有使用 Vite + TypeScript 的前端项目。
- React/Vue/Svelte 等框架的 Vite 项目。

---

*最后更新时间：2024年* 