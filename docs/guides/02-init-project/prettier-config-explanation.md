# Prettier 配置文件 .prettierrc.cjs 详解

本文档解释了为什么 Prettier 配置文件可以用 `.cjs` 结尾，还有哪些可用的结尾格式，并详细说明了 `.prettierrc.cjs` 文件中每一行配置的含义及其对应的 Prettier 语法规则。

---

## 1. 为什么用 `.cjs` 结尾？

- `.cjs` 代表 CommonJS 模块格式（CommonJS Script）。
- Node.js 14+ 支持 ES Module（`.mjs`）和 CommonJS（`.cjs`）两种模块系统。
- 当 Prettier 需要动态配置（如注释、变量、条件等）时，可以使用 JS 文件作为配置文件。
- 如果你的项目 `package.json` 里 `type` 字段为 `module`，那么 `.js` 文件会被当作 ES Module 解析，这时需要用 `.cjs` 明确指定为 CommonJS，否则 Prettier 可能无法正确加载。
- 这样可以保证 Prettier 能正确读取配置，无论项目是 CommonJS 还是 ESM。

### 其他可用的 Prettier 配置文件格式

- `.prettierrc`（JSON 或 YAML 格式）
- `.prettierrc.json`（JSON 格式）
- `.prettierrc.yaml` / `.prettierrc.yml`（YAML 格式）
- `.prettierrc.js`（JavaScript，CommonJS 或 ESM，取决于 Node 版本和 package.json type）
- `.prettierrc.cjs`（JavaScript，强制 CommonJS）
- `prettier.config.js` / `prettier.config.cjs`（同上，支持项目根目录）
- `package.json` 的 `prettier` 字段

---

## 2. `.prettierrc.cjs` 文件内容详解

```js
module.exports = {
  // 每行最大列，超过换行
  printWidth: 120,
  // 使用制表符而不是空格缩进
  useTabs: false,
  // 缩进
  tabWidth: 2,
  // 结尾不用分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 在JSX中使用单引号而不是双引号
  jsxSingleQuote: true,
  // 箭头函数里面，如果是一个参数的时候，去掉括号
  arrowParens: 'avoid',
  // 对象、数组括号与文字间添加空格
  bracketSpacing: true,
  // 尾随逗号
  trailingComma: 'none',
}
```

| 配置项            | 作用说明                                                                 | 语法规则/效果                                                         |
|-------------------|--------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `printWidth`      | 每行最大字符数，超出自动换行                                              | 代码风格建议，常见值 80/100/120                                       |
| `useTabs`         | 是否使用 tab 缩进（true=tab，false=空格）                                 | 统一缩进风格                                                          |
| `tabWidth`        | 每个缩进级别的空格数                                                     | 2/4 常见，配合 useTabs=false 时生效                                   |
| `semi`            | 语句末尾是否加分号（true=加，false=不加）                                | JS/TS/JSX/JSON 等                                                     |
| `singleQuote`     | 字符串是否使用单引号（true=单引号，false=双引号）                        | JS/TS/JSX/JSON 等                                                     |
| `jsxSingleQuote`  | JSX 属性值是否使用单引号（true=单引号，false=双引号）                    | 仅影响 JSX/TSX                                                        |
| `arrowParens`     | 箭头函数参数是否总是加括号（'always'=总是，'avoid'=单参数不加括号）      | (x) => x vs x => x                                                    |
| `bracketSpacing`  | 对象字面量大括号内是否加空格（true=加，false=不加）                      | { foo: bar } vs {foo: bar}                                            |
| `trailingComma`   | 多行对象/数组/参数列表末尾是否加逗号（'none'/'es5'/'all'）                | 'none'=不加，'es5'=ES5支持的加，'all'=所有多行结构都加                |

---

## 3. 配置项举例

### printWidth
```js
// printWidth: 10
const foo = 'this is a long string' //
// 格式化后：
const foo =
  'this is a
  long string'
```

### useTabs & tabWidth
```js
// useTabs: false, tabWidth: 2
function foo() {
  console.log('bar')
}
```

### semi
```js
// semi: false
const a = 1
// semi: true
const a = 1;
```

### singleQuote & jsxSingleQuote
```js
// singleQuote: true
const str = 'hello'
// jsxSingleQuote: true
const jsx = <div className='foo'></div>
```

### arrowParens
```js
// arrowParens: 'avoid'
const fn = x => x
// arrowParens: 'always'
const fn = (x) => x
```

### bracketSpacing
```js
// bracketSpacing: true
const obj = { foo: 1 }
// bracketSpacing: false
const obj = {foo: 1}
```

### trailingComma
```js
// trailingComma: 'none'
const arr = [1, 2, 3]
// trailingComma: 'es5'
const arr = [1, 2, 3,]
```

---

## 4. 总结
- `.prettierrc.cjs` 适用于需要 JS 动态配置或 ESM 项目下的 CommonJS 配置
- Prettier 支持多种配置文件格式，推荐团队统一规范
- 每个配置项都直接影响代码格式化风格，建议根据团队习惯选择

---

*最后更新时间：2024年* 