# 安装指南

本文档将指导您完成 React 管理系统的安装和配置。

## 📋 环境要求

### 必需环境
- **Node.js**: 18.0.0 或更高版本
- **npm**: 8.0.0 或更高版本
- **Git**: 用于版本控制

### 推荐环境
- **操作系统**: macOS 12+, Windows 10+, Ubuntu 20.04+
- **编辑器**: VS Code, WebStorm, Sublime Text
- **浏览器**: Chrome 90+, Firefox 88+, Safari 14+

## 🔧 环境检查

在开始安装之前，请确保您的开发环境满足要求：

```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version

# 检查 Git 版本
git --version
```

## 📦 项目安装

### 1. 克隆项目

```bash
# 使用 HTTPS
git clone https://github.com/your-username/react-management-sys.git

# 或使用 SSH
git clone git@github.com:your-username/react-management-sys.git

# 进入项目目录
cd react-management-sys
```

### 2. 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

### 3. 环境配置

创建环境配置文件：

```bash
# 复制环境配置模板
cp .env.example .env.local

# 编辑环境配置
nano .env.local
```

### 4. 启动开发服务器

```bash
# 启动开发服务器
npm run dev

# 或使用 yarn
yarn dev

# 或使用 pnpm
pnpm dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

## 🚀 快速验证

安装完成后，您可以通过以下方式验证安装是否成功：

### 1. 检查项目结构

```bash
# 查看项目文件结构
ls -la

# 检查 node_modules 是否安装
ls node_modules
```

### 2. 运行测试

```bash
# 运行单元测试
npm test

# 运行 E2E 测试
npm run test:e2e
```

### 3. 构建项目

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🔍 常见问题

### 问题 1: Node.js 版本过低

**错误信息**: `Error: Node.js version is too old`

**解决方案**:
```bash
# 使用 nvm 安装新版本 Node.js
nvm install 18
nvm use 18

# 或直接从官网下载安装
# https://nodejs.org/
```

### 问题 2: 依赖安装失败

**错误信息**: `npm ERR! code ENOENT`

**解决方案**:
```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装依赖
npm install
```

### 问题 3: 端口被占用

**错误信息**: `Port 5173 is already in use`

**解决方案**:
```bash
# 查找占用端口的进程
lsof -i :5173

# 杀死进程
kill -9 <PID>

# 或使用其他端口启动
npm run dev -- --port 3000
```

## 📚 下一步

安装完成后，您可以：

1. 阅读 [项目设置](./setup.md) 了解项目配置
2. 查看 [第一个功能](./first-steps.md) 开始开发
3. 浏览 [使用指南](../guides/components.md) 了解组件使用

## 🆘 获取帮助

如果您在安装过程中遇到问题：

1. 查看 [常见问题](#常见问题) 部分
2. 搜索项目 [Issues](../../issues)
3. 创建新的 [Issue](../../issues/new) 描述问题

---

*最后更新时间：2024年* 