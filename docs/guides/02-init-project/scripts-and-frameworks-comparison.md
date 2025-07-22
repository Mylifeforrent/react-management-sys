# 前端脚手架与 package.json scripts 配置对比分析

本文档详细对比分析了 Vite、Next.js、Create React App（CRA）等主流前端开发脚手架在 `package.json` 的 `scripts` 配置上的差异、原理，以及它们如何与 `package.json` 配合使用。

---

## 1. package.json 与脚手架的关系

### 1.1 package.json 作用
- `package.json` 是 Node.js 项目的核心配置文件，记录了项目的依赖、元信息、脚本命令等。
- 其中 `scripts` 字段定义了常用的命令行脚本，开发者可通过 `npm run <script>` 或 `yarn <script>` 执行。

### 1.2 脚手架与 package.json 的配合
- 脚手架（如 Vite、Next.js、CRA）在初始化项目时会自动生成适合自身的 `package.json`，并配置好对应的 `scripts`。
- 这些脚本本质上是对底层工具（如 Vite、Webpack、Next.js CLI 等）的命令封装，方便开发者一键执行常用任务（如开发、构建、测试、部署等）。

---

## 2. 不同脚手架的 scripts 配置对比

### 2.1 Vite 项目

**示例 package.json scripts：**
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```
- `dev`：启动 Vite 开发服务器，支持热更新
- `build`：使用 Vite 打包生产代码
- `preview`：本地预览生产构建结果
- `lint`：代码风格检查

**原理说明：**
- Vite 提供了 CLI 工具，`vite` 命令会自动调用本地依赖的 Vite 包。
- `vite.config.js` 作为配置文件，控制打包、插件、别名等。
- 这些脚本直接映射到 Vite 的 CLI 命令。

---

### 2.2 Create React App (CRA) 项目

**示例 package.json scripts：**
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```
- `start`：启动开发服务器（基于 Webpack），支持热更新
- `build`：打包生产代码
- `test`：运行测试（Jest）
- `eject`：弹出所有配置，暴露底层 Webpack 配置

**原理说明：**
- CRA 封装了所有配置在 `react-scripts` 包中，开发者无需关心底层 Webpack、Babel、ESLint 等配置。
- 脚本命令本质上是调用 `react-scripts` 的不同子命令。
- `eject` 后，所有配置文件会暴露到项目根目录，开发者可自定义。

---

### 2.3 Next.js 项目

**示例 package.json scripts：**
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```
- `dev`：启动 Next.js 开发服务器，支持 SSR/SSG 热更新
- `build`：构建生产环境静态和服务端渲染代码
- `start`：启动生产环境服务器
- `lint`：代码风格检查

**原理说明：**
- Next.js 提供了自己的 CLI 工具，`next` 命令会自动调用本地依赖的 Next.js 包。
- `next.config.js` 控制路由、构建、API 路径等高级特性。
- Next.js 支持服务端渲染（SSR）、静态生成（SSG）、API 路由等，脚本命令与这些特性紧密相关。

---

## 3. scripts 配置差异的根本原因

1. **底层构建工具不同**
   - Vite：基于原生 ES 模块和 Rollup，极致快的开发体验
   - CRA：基于 Webpack，封装了复杂的配置
   - Next.js：自研构建系统，支持 SSR/SSG/API

2. **项目定位和特性不同**
   - Vite：专注于前端开发和静态资源打包
   - CRA：零配置开发 React SPA
   - Next.js：支持服务端渲染、静态生成、API 路由

3. **命令行工具不同**
   - 每个脚手架都提供了自己的 CLI 工具，scripts 直接调用这些工具

4. **配置暴露程度不同**
   - CRA 默认隐藏所有配置，Next.js 和 Vite 支持自定义配置

---

## 4. package.json scripts 的工作原理

- `npm run <script>` 或 `yarn <script>` 会查找 `package.json` 中的 `scripts` 字段
- 执行对应的命令（如 `vite`、`next dev`、`react-scripts start`）
- 这些命令会优先调用本地 `node_modules/.bin` 下的可执行文件
- 脚手架工具根据命令执行对应的开发、构建、测试等任务

---

## 5. 总结对比表

| 脚手架 | 开发命令 | 构建命令 | 预览/启动命令 | 测试命令 | 配置暴露 | 主要特性 |
|--------|----------|----------|---------------|----------|----------|----------|
| Vite   | dev      | build    | preview       | -        | 高       | 极速开发、现代打包 |
| CRA    | start    | build    | -             | test     | 低       | 零配置、SPA |
| Next.js| dev      | build    | start         | -        | 中       | SSR/SSG、API 路由 |

---

## 6. 参考资料
- [Vite 官方文档](https://vitejs.dev/guide/)
- [Create React App 官方文档](https://create-react-app.dev/docs/getting-started/)
- [Next.js 官方文档](https://nextjs.org/docs)

---

*最后更新时间：2024年* 