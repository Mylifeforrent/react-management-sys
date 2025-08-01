# HTML 环境变量配置方式分析

## 概述

通过在 HTML 中使用 `data-*` 属性指定环境变量是一种灵活的运行时环境配置方式。本文档将详细分析这种方式的优点、使用场景和实现方法。

## 1. 实现原理

### HTML 配置
```html
<!doctype html>
<html lang="en" data-env="development">
  <head>
    <meta charset="UTF-8" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### JavaScript 读取
```typescript
// src/config/index.ts
type ENV = 'dev' | 'stg' | 'prd';

// 从 HTML 的 data-env 属性读取环境变量
const env = (document.documentElement.dataset.env as ENV) || 'stg'

const config = {
  dev: {
    baseApi: '/api',
    uploadApi: true,
    mock: true,
    mockApi: 'xxx',
    cdn: "http://xxx.aliyun.com"
  },
  stg: {
    baseApi: '/api',
    uploadApi: true,
    mock: false,
    mockApi: 'xxx',
    cdn: "http://xxx.aliyun.com"
  },
  prd: {
    baseApi: '/api',
    uploadApi: true,
    mock: false,
    mockApi: 'xxx',
    cdn: "http://xxx.aliyun.com"
  },
};

export default {
  env,
  ...config[env],
}
```

## 2. 核心优点分析

### 2.1 部署灵活性 ⭐⭐⭐⭐⭐
**优点**：一次构建，多环境部署
```bash
# 构建一次
npm run build

# 部署到不同环境时，只需修改 HTML 文件
# 开发环境
<html data-env="dev">

# 测试环境
<html data-env="stg">

# 生产环境
<html data-env="prd">
```

**传统方式对比**：
```bash
# 传统方式需要多次构建
npm run build:dev    # 构建开发版本
npm run build:stg    # 构建测试版本
npm run build:prd    # 构建生产版本
```

### 2.2 运维便利性 ⭐⭐⭐⭐⭐
**优点**：运维人员可以直接修改 HTML 文件切换环境
```html
<!-- 运维人员只需修改这一行 -->
<html lang="en" data-env="production">
```

**应用场景**：
- 紧急环境切换
- 灰度发布
- A/B 测试
- 故障回滚

### 2.3 成本效益 ⭐⭐⭐⭐⭐
**优点**：减少构建时间和存储空间
```bash
# 传统方式
构建时间: 3 × 5分钟 = 15分钟
存储空间: 3 × 50MB = 150MB

# HTML 环境变量方式
构建时间: 1 × 5分钟 = 5分钟
存储空间: 1 × 50MB = 50MB
```

### 2.4 调试便利性 ⭐⭐⭐⭐⭐
**优点**：可以在浏览器中动态修改环境
```javascript
// 在浏览器控制台中动态切换环境
document.documentElement.dataset.env = 'dev';
location.reload(); // 重新加载页面应用新环境
```

### 2.5 配置透明性 ⭐⭐⭐⭐
**优点**：环境配置一目了然
```html
<!-- 查看页面源码就能知道当前环境 -->
<html lang="en" data-env="production">
```

## 3. 详细使用示例

### 3.1 基础配置示例

#### HTML 配置
```html
<!doctype html>
<html lang="en" data-env="development" data-version="1.0.0" data-build="20231201">
  <head>
    <meta charset="UTF-8" />
    <title>React 管理系统</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### TypeScript 配置读取
```typescript
// src/config/index.ts
interface AppConfig {
  env: string;
  version: string;
  build: string;
  baseApi: string;
  uploadApi: string;
  mock: boolean;
  cdn: string;
}

class ConfigManager {
  private config: AppConfig;

  constructor() {
    this.config = this.initConfig();
  }

  private initConfig(): AppConfig {
    const { dataset } = document.documentElement;

    // 从 HTML data-* 属性读取基础信息
    const env = dataset.env || 'development';
    const version = dataset.version || '1.0.0';
    const build = dataset.build || 'unknown';

    // 根据环境返回对应配置
    const envConfigs = {
      development: {
        baseApi: 'http://localhost:8081/api',
        uploadApi: 'http://localhost:8081/upload',
        mock: true,
        cdn: 'http://dev-cdn.company.com'
      },
      staging: {
        baseApi: 'http://api-stg.company.com/api',
        uploadApi: 'http://upload-stg.company.com',
        mock: false,
        cdn: 'http://stg-cdn.company.com'
      },
      production: {
        baseApi: 'https://api.company.com/api',
        uploadApi: 'https://upload.company.com',
        mock: false,
        cdn: 'https://cdn.company.com'
      }
    };

    const envConfig = envConfigs[env as keyof typeof envConfigs] || envConfigs.development;

    return {
      env,
      version,
      build,
      ...envConfig
    };
  }

  public getConfig(): AppConfig {
    return this.config;
  }

  public getEnv(): string {
    return this.config.env;
  }

  public isDevelopment(): boolean {
    return this.config.env === 'development';
  }

  public isProduction(): boolean {
    return this.config.env === 'production';
  }
}

export default new ConfigManager();
```

### 3.2 高级配置示例

#### 多维度环境配置
```html
<!doctype html>
<html lang="en"
      data-env="production"
      data-region="cn"
      data-feature-flags="new-ui,dark-mode"
      data-api-version="v2">
  <head>
    <meta charset="UTF-8" />
    <title>React 管理系统</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### 对应的配置读取
```typescript
// src/config/advanced.ts
interface AdvancedConfig {
  env: string;
  region: string;
  featureFlags: string[];
  apiVersion: string;
  baseApi: string;
  features: {
    newUI: boolean;
    darkMode: boolean;
  };
}

class AdvancedConfigManager {
  private config: AdvancedConfig;

  constructor() {
    this.config = this.initAdvancedConfig();
  }

  private initAdvancedConfig(): AdvancedConfig {
    const { dataset } = document.documentElement;

    const env = dataset.env || 'development';
    const region = dataset.region || 'us';
    const featureFlags = dataset.featureFlags?.split(',') || [];
    const apiVersion = dataset.apiVersion || 'v1';

    // 根据地区和环境确定 API 地址
    const getBaseApi = (env: string, region: string, version: string) => {
      const regionMap = {
        cn: 'api.company.cn',
        us: 'api.company.com',
        eu: 'api.company.eu'
      };

      const envPrefix = env === 'production' ? '' : `${env}-`;
      const domain = regionMap[region as keyof typeof regionMap] || regionMap.us;

      return `https://${envPrefix}${domain}/${version}`;
    };

    return {
      env,
      region,
      featureFlags,
      apiVersion,
      baseApi: getBaseApi(env, region, apiVersion),
      features: {
        newUI: featureFlags.includes('new-ui'),
        darkMode: featureFlags.includes('dark-mode')
      }
    };
  }

  public getConfig(): AdvancedConfig {
    return this.config;
  }
}

export default new AdvancedConfigManager();
```

### 3.3 在组件中使用

```typescript
// src/components/Header.tsx
import React from 'react';
import config from '@/config';

const Header: React.FC = () => {
  return (
    <header>
      <h1>React 管理系统</h1>
      <div className="env-info">
        <span>环境: {config.getEnv()}</span>
        <span>版本: {config.getConfig().version}</span>
        {config.isDevelopment() && (
          <span style={{ color: 'red' }}>开发模式</span>
        )}
      </div>
    </header>
  );
};

export default Header;
```

## 4. 部署实践示例

### 4.1 Docker 部署
```dockerfile
# Dockerfile
FROM nginx:alpine

# 复制构建产物
COPY dist/ /usr/share/nginx/html/

# 复制不同环境的 HTML 模板
COPY deploy/index.dev.html /usr/share/nginx/html/templates/
COPY deploy/index.stg.html /usr/share/nginx/html/templates/
COPY deploy/index.prd.html /usr/share/nginx/html/templates/

# 复制启动脚本
COPY deploy/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
```

```bash
#!/bin/bash
# deploy/start.sh

# 根据环境变量选择对应的 HTML 文件
case "$DEPLOY_ENV" in
  "development")
    cp /usr/share/nginx/html/templates/index.dev.html /usr/share/nginx/html/index.html
    ;;
  "staging")
    cp /usr/share/nginx/html/templates/index.stg.html /usr/share/nginx/html/index.html
    ;;
  "production")
    cp /usr/share/nginx/html/templates/index.prd.html /usr/share/nginx/html/index.html
    ;;
  *)
    cp /usr/share/nginx/html/templates/index.dev.html /usr/share/nginx/html/index.html
    ;;
esac

# 启动 Nginx
nginx -g "daemon off;"
```

### 4.2 Kubernetes 部署
```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: react-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: react-app
  template:
    metadata:
      labels:
        app: react-app
    spec:
      containers:
      - name: react-app
        image: react-app:latest
        env:
        - name: DEPLOY_ENV
          value: "production"  # 通过环境变量控制
        ports:
        - containerPort: 80
```

### 4.3 CI/CD 集成
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main, staging, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Build
      run: |
        npm install
        npm run build

    - name: Deploy to Development
      if: github.ref == 'refs/heads/develop'
      run: |
        # 修改 HTML 文件的环境标识
        sed -i 's/data-env="[^"]*"/data-env="development"/' dist/index.html
        # 部署到开发环境

    - name: Deploy to Staging
      if: github.ref == 'refs/heads/staging'
      run: |
        sed -i 's/data-env="[^"]*"/data-env="staging"/' dist/index.html
        # 部署到测试环境

    - name: Deploy to Production
      if: github.ref == 'refs/heads/main'
      run: |
        sed -i 's/data-env="[^"]*"/data-env="production"/' dist/index.html
        # 部署到生产环境
```

## 5. 与其他方式的对比

### 5.1 对比表格
| 特性 | HTML data-* | .env 文件 | 域名判断 | 服务端配置 |
|------|-------------|-----------|----------|------------|
| 部署灵活性 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| 配置透明性 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| 安全性 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 维护成本 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| 调试便利性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

### 5.2 适用场景
- **HTML data-*** 适合：需要灵活部署、频繁环境切换的项目
- **.env 文件** 适合：安全性要求高、配置相对固定的项目
- **域名判断** 适合：环境域名规范、不需要频繁修改的项目
- **服务端配置** 适合：大型企业级应用、需要动态配置的项目

## 6. 注意事项和最佳实践

### 6.1 安全考虑
```typescript
// 不要在 HTML 中暴露敏感信息
// ❌ 错误示例
<html data-api-key="sk-1234567890abcdef">

// ✅ 正确示例
<html data-env="production" data-region="cn">
```

### 6.2 类型安全
```typescript
// 使用 TypeScript 确保类型安全
type ENV = 'development' | 'staging' | 'production';
type Region = 'cn' | 'us' | 'eu';

const env = document.documentElement.dataset.env as ENV;
const region = document.documentElement.dataset.region as Region;

// 添加运行时验证
if (!['development', 'staging', 'production'].includes(env)) {
  console.warn(`未知环境: ${env}, 使用默认环境 development`);
}
```

### 6.3 错误处理
```typescript
// 添加容错机制
const getConfig = () => {
  try {
    const env = document.documentElement.dataset.env || 'development';
    return envConfigs[env] || envConfigs.development;
  } catch (error) {
    console.error('配置读取失败:', error);
    return envConfigs.development; // 返回默认配置
  }
};
```

### 6.4 调试支持
```typescript
// 开发环境下提供调试信息
if (config.isDevelopment()) {
  // 在控制台输出配置信息
  console.log('当前配置:', config.getConfig());

  // 提供全局调试方法
  (window as any).__CONFIG__ = config;
  (window as any).__SWITCH_ENV__ = (env: string) => {
    document.documentElement.dataset.env = env;
    location.reload();
  };
}
```

## 7. 总结

HTML 环境变量配置方式的主要优点：

1. **部署灵活性**：一次构建，多环境部署
2. **运维便利性**：可以直接修改 HTML 文件切换环境
3. **成本效益**：减少构建时间和存储空间
4. **调试便利性**：可以在浏览器中动态修改环境
5. **配置透明性**：环境配置一目了然

这种方式特别适合需要频繁环境切换、灵活部署的项目，是现代前端项目中一种实用的环境配置方案。

## 8. 实际项目建议

对于当前项目，建议：

1. **保持现有方式**：HTML data-env 方式已经很好用
2. **增强类型安全**：添加 TypeScript 类型定义
3. **完善错误处理**：添加配置读取的容错机制
4. **文档化部署流程**：明确不同环境的部署步骤
5. **添加调试支持**：在开发环境提供配置调试工具

这样可以充分发挥 HTML 环境变量配置的优势，同时避免潜在的问题。
