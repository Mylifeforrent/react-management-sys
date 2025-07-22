# 项目目录结构

本文档详细介绍了 React 管理系统的项目目录结构，帮助您快速理解项目的组织方式。

## 📁 根目录结构

```
react-management-sys/
├── public/                 # 静态资源目录
│   ├── favicon.ico        # 网站图标
│   ├── logo192.png        # 应用图标
│   └── manifest.json      # PWA 配置
├── src/                   # 源代码目录
│   ├── components/        # 通用组件
│   ├── pages/            # 页面组件
│   ├── hooks/            # 自定义 Hooks
│   ├── utils/            # 工具函数
│   ├── styles/           # 样式文件
│   ├── types/            # TypeScript 类型定义
│   ├── constants/        # 常量定义
│   ├── services/         # API 服务
│   ├── store/            # 状态管理
│   ├── router/           # 路由配置
│   ├── assets/           # 资源文件
│   ├── App.tsx           # 根组件
│   ├── main.tsx          # 应用入口
│   └── index.css         # 全局样式
├── docs/                 # 项目文档
├── tests/                # 测试文件
├── .github/              # GitHub 配置
├── .vscode/              # VS Code 配置
├── package.json          # 项目配置
├── vite.config.js        # Vite 配置
├── tsconfig.json         # TypeScript 配置
├── eslint.config.js      # ESLint 配置
├── .gitignore           # Git 忽略文件
├── README.md            # 项目说明
└── CHANGELOG.md         # 变更日志
```

## 🔧 核心目录详解

### `/src/` - 源代码目录

这是项目的核心目录，包含所有业务逻辑代码。

#### `/src/components/` - 通用组件
```
components/
├── common/              # 基础通用组件
│   ├── Button/         # 按钮组件
│   ├── Input/          # 输入框组件
│   ├── Modal/          # 模态框组件
│   └── Loading/        # 加载组件
├── layout/             # 布局组件
│   ├── Header/         # 头部组件
│   ├── Sidebar/        # 侧边栏组件
│   ├── Footer/         # 底部组件
│   └── Layout/         # 主布局组件
├── business/           # 业务组件
│   ├── UserCard/       # 用户卡片
│   ├── DataTable/      # 数据表格
│   └── Chart/          # 图表组件
└── index.ts           # 组件导出文件
```

#### `/src/pages/` - 页面组件
```
pages/
├── dashboard/          # 仪表板页面
├── user/              # 用户管理页面
├── product/           # 产品管理页面
├── order/             # 订单管理页面
├── settings/          # 设置页面
├── login/             # 登录页面
├── error/             # 错误页面
└── index.ts           # 页面导出文件
```

#### `/src/hooks/` - 自定义 Hooks
```
hooks/
├── useAuth.ts         # 认证相关 Hook
├── useApi.ts          # API 请求 Hook
├── useLocalStorage.ts # 本地存储 Hook
├── useDebounce.ts     # 防抖 Hook
├── useThrottle.ts     # 节流 Hook
└── index.ts           # Hooks 导出文件
```

#### `/src/utils/` - 工具函数
```
utils/
├── request.ts         # HTTP 请求工具
├── storage.ts         # 存储工具
├── format.ts          # 格式化工具
├── validate.ts        # 验证工具
├── constants.ts       # 常量定义
└── index.ts           # 工具函数导出
```

#### `/src/services/` - API 服务
```
services/
├── api/               # API 接口定义
│   ├── user.ts        # 用户相关 API
│   ├── product.ts     # 产品相关 API
│   └── order.ts       # 订单相关 API
├── types/             # API 类型定义
└── index.ts           # 服务导出文件
```

#### `/src/store/` - 状态管理
```
store/
├── slices/            # Redux slices
│   ├── authSlice.ts   # 认证状态
│   ├── userSlice.ts   # 用户状态
│   └── appSlice.ts    # 应用状态
├── middleware/        # 中间件
├── types/             # 状态类型定义
└── index.ts           # Store 配置
```

### `/public/` - 静态资源目录

存放不需要经过构建处理的静态文件。

```
public/
├── favicon.ico        # 网站图标
├── logo192.png        # 应用图标 (192x192)
├── logo512.png        # 应用图标 (512x512)
├── manifest.json      # PWA 配置文件
├── robots.txt         # 搜索引擎爬虫配置
└── images/            # 图片资源
    ├── icons/         # 图标文件
    └── backgrounds/   # 背景图片
```

### `/docs/` - 项目文档

```
docs/
├── README.md          # 文档首页
├── getting-started/   # 快速开始
├── guides/            # 使用指南
├── api/               # API 文档
├── architecture/      # 架构文档
└── deployment/        # 部署文档
```

## 📋 文件命名规范

### 组件文件命名
- **PascalCase**: `UserProfile.tsx`, `DataTable.tsx`
- **目录结构**: 每个组件一个目录，包含组件文件和样式文件

### 工具函数命名
- **camelCase**: `formatDate.ts`, `validateEmail.ts`
- **kebab-case**: `api-client.ts`, `storage-utils.ts`

### 页面文件命名
- **kebab-case**: `user-profile.tsx`, `product-list.tsx`
- **或 PascalCase**: `UserProfile.tsx`, `ProductList.tsx`

## 🔗 导入路径规范

### 绝对路径导入
```typescript
// 推荐：使用绝对路径
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/format';
```

### 相对路径导入
```typescript
// 适用于同目录或相邻目录
import { UserCard } from './UserCard';
import { userApi } from '../services/api/user';
```

## 📝 配置文件说明

### `vite.config.js` - Vite 配置
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### `tsconfig.json` - TypeScript 配置
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 🎯 最佳实践

### 1. 目录组织原则
- **单一职责**: 每个目录只负责一个特定功能
- **可扩展性**: 目录结构要便于后续扩展
- **可维护性**: 便于团队成员理解和维护

### 2. 文件组织建议
- 相关文件放在同一目录下
- 使用 index.ts 文件统一导出
- 保持目录层级不要过深（建议不超过 4 层）

### 3. 命名规范
- 使用有意义的名称
- 保持命名风格一致
- 避免使用缩写（除非是通用缩写）

## 🔄 目录结构演进

随着项目的发展，目录结构可能会发生变化：

### 初期阶段
```
src/
├── components/
├── pages/
├── utils/
└── App.tsx
```

### 成长阶段
```
src/
├── components/
├── pages/
├── hooks/
├── utils/
├── services/
└── store/
```

### 成熟阶段
```
src/
├── components/
│   ├── common/
│   ├── layout/
│   └── business/
├── pages/
├── hooks/
├── utils/
├── services/
├── store/
└── types/
```

---

*最后更新时间：2024年* 