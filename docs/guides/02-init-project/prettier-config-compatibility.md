# Prettier 配置文件格式兼容性与 ESM 支持说明

## 1. `.prettierrc.json` 是否更加兼容？

- **兼容性角度**：  
  `.prettierrc.json` 是纯 JSON 格式，Prettier 官方和所有主流编辑器插件都原生支持。
  - **优点**：  
    - 纯数据格式，跨平台、跨编辑器、跨工具链都能直接读取。
    - 不依赖 Node.js 的模块系统（CommonJS/ESM），不会受 `package.json` 的 `type` 字段影响。
    - 适合团队协作和 CI 场景，最不容易出错。
  - **缺点**：  
    - 不能写注释、不能用变量、不能动态生成配置。

- **结论**：  
  如果追求最大兼容性和简单性，推荐使用 `.prettierrc.json` 或 `.prettierrc`（JSON/YAML）。

---

## 2. `package.json` 设为 `type: "module"` 时，Prettier 能否用 `.prettierrc.mjs`？

- **理论上**：  
  `.mjs` 是 Node.js 的 ES Module 配置文件扩展名，适用于 ESM 项目。
- **实际上**：  
  截止 2024 年 6 月，Prettier 官方**不支持**以 `.mjs` 结尾的配置文件（即 `.prettierrc.mjs` 或 `prettier.config.mjs`）。  
  Prettier 只支持以下 JS 配置文件扩展名：
  - `.js`（受 `type` 字段影响，可能被当作 ESM 或 CommonJS）
  - `.cjs`（强制 CommonJS，推荐在 `type: "module"` 项目下使用）

- **官方建议**：  
  - 如果你的项目 `package.json` 里 `type: "module"`，**不要用 `.js`**，而应使用 `.cjs` 作为 Prettier 配置文件扩展名。
  - **不要用 `.mjs`**，因为 Prettier 不会加载它。

---

## 3. 推荐实践

| 项目类型           | 推荐 Prettier 配置文件格式         | 说明                       |
|--------------------|------------------------------------|----------------------------|
| 任何项目           | `.prettierrc.json`                 | 兼容性最好，纯数据         |
| CommonJS 项目      | `.prettierrc.js` 或 `.prettierrc.cjs` | 可用 JS 动态配置           |
| ESM (`type:module`) | `.prettierrc.cjs`                  | 避免 `.js`/`.mjs` 解析歧义 |

---

## 4. 参考资料

- [Prettier 官方配置文档](https://prettier.io/docs/en/configuration.html)
- [Node.js ESM/CommonJS 文档](https://nodejs.org/api/esm.html)

---

*最后更新时间：2024年* 