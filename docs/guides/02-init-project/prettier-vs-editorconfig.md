# Prettier 与 EditorConfig 的区别与对比

本文档详细对比了 Prettier 和 EditorConfig 两种常见的代码格式化工具，说明它们的作用、区别，并通过示例帮助理解。

---

## 1. 基本介绍

### 1.1 Prettier
- **类型**：代码格式化工具（opinionated code formatter）
- **作用**：自动格式化代码，使代码风格统一，支持多种语言（JS/TS/JSON/HTML/CSS/Markdown 等）
- **集成方式**：可通过命令行、编辑器插件、CI 工具等自动运行
- **常见配置文件**：`.prettierrc`、`prettier.config.js`

### 1.2 EditorConfig
- **类型**：编辑器配置规范（editor setting standard）
- **作用**：为不同编辑器和 IDE 统一基本的代码风格（如缩进、换行符、编码等）
- **集成方式**：依赖编辑器/IDE 的 EditorConfig 插件支持
- **常见配置文件**：`.editorconfig`

---

## 2. 主要区别

| 对比项         | Prettier                        | EditorConfig                  |
|----------------|----------------------------------|-------------------------------|
| 目标           | 代码格式化（内容和风格）        | 编辑器基础风格（缩进等）      |
| 支持语言       | 多种主流前端/后端/文档语言      | 只影响文本文件                |
| 配置粒度       | 细致（如分号、引号、宽度等）    | 粗略（缩进、换行、编码等）    |
| 应用方式       | 运行命令/保存时自动格式化        | 编辑器自动应用                |
| 依赖           | 需安装 Prettier                  | 需编辑器支持 EditorConfig     |
| 统一性         | 强制统一格式                    | 仅保证基础风格一致            |
| 典型用途       | 团队代码风格强制、CI 检查        | 团队跨 IDE/编辑器基础规范      |

---

## 3. 配置示例对比

### 3.1 Prettier 配置示例
`.prettierrc`
```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true
}
```

**效果**：
- 自动加分号、单引号、每行最大 80 字符、对象大括号有空格等

### 3.2 EditorConfig 配置示例
`.editorconfig`
```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

**效果**：
- 所有文件使用 2 空格缩进、LF 换行、UTF-8 编码、去除行尾空格、文件末尾加换行

---

## 4. 实际应用场景

- **Prettier**：
  - 团队需要严格统一代码风格（如引号、分号、对象格式等）
  - 代码提交前自动格式化，减少代码 review 风格争议
  - 支持多种文件类型（如 JS/TS/JSON/HTML/Markdown 等）

- **EditorConfig**：
  - 团队成员使用不同编辑器/IDE，需统一基础格式（如缩进、换行符）
  - 适合与 Prettier、ESLint 等工具配合使用
  - 只关注最基础的格式，不涉及代码内容风格

---

## 5. 组合使用建议

- **EditorConfig** 负责统一基础格式（缩进、换行、编码），保证跨编辑器一致性
- **Prettier** 负责统一代码风格和内容格式，保证团队代码风格高度一致
- 两者可以同时存在，互不冲突，推荐配合使用

---

## 6. 总结

- **EditorConfig** 解决“不同编辑器下基础格式不一致”的问题
- **Prettier** 解决“团队代码风格不统一”的问题
- 推荐：团队项目同时使用 EditorConfig 和 Prettier，提升代码一致性和可维护性

---

*最后更新时间：2024年* 