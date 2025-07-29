# Request.ts 封装思路分析

## 概述

`request.ts` 是基于 axios 封装的 HTTP 请求工具，采用了拦截器模式和统一错误处理的设计思路，为整个应用提供了标准化的 API 调用接口。

## 核心设计思路

### 1. 单例模式 + 配置集中化

```typescript
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: ''
  }
})
```

**设计目的：**
- 创建一个全局唯一的 axios 实例
- 统一配置所有请求的基础参数
- 避免在每个 API 调用时重复配置

**关键配置说明：**
- `timeout: 8000`：统一设置 8 秒超时，防止请求无限等待
- `withCredentials: true`：允许跨域请求携带 cookies，支持身份验证
- `headers.icode`：预留的自定义请求头，可能用于接口验证

### 2. 请求拦截器 - AOP 切面编程思想

```typescript
instance.interceptors.request.use(
  config => {
    showLoading()           // 统一显示加载状态
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Token ' + token  // 自动注入认证信息
    }
    return { ...config }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
```

**设计思路：**
- **横切关注点分离**：将加载状态管理和认证逻辑从业务代码中抽离
- **自动化处理**：每个请求自动处理 loading 和 token，无需手动操作
- **配置增强**：在请求发送前统一修改请求配置

**解决的问题：**
1. 避免在每个 API 调用时手动显示 loading
2. 自动处理用户认证，无需每次手动添加 token
3. 统一的请求预处理逻辑

### 3. 响应拦截器 - 统一错误处理和数据转换

```typescript
instance.interceptors.response.use(
  response => {
    hideLoading()  // 统一隐藏加载状态
    const data = response.data

    // 文件下载特殊处理
    if (response.config.responseType === 'blob') return response

    // 业务错误统一处理
    if (data.code === 500001) {
      message.error(data.msg)
      localStorage.removeItem('token')
      // location.href = '/login'
    } else if (data.code !== 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }

    return data.data  // 只返回业务数据
  },
  (error) => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)
```

**设计思路：**
- **统一数据格式**：假设后端返回格式为 `{ code, msg, data }`
- **错误分层处理**：区分网络错误、业务错误、认证错误
- **用户体验优化**：自动显示错误提示，自动处理登录过期

**关键处理逻辑：**
1. **加载状态管理**：无论成功失败都隐藏 loading
2. **文件下载支持**：blob 类型请求直接返回完整响应
3. **认证失败处理**：code 500001 时清除 token 并跳转登录
4. **数据提取**：成功时只返回 `data.data`，简化业务代码

### 4. 方法封装 - 简化调用接口

```typescript
export default {
  get<T>(url: string, params: any): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, params: any): Promise<T> {
    return instance.post(url, params)
  }
}
```

**设计思路：**
- **接口统一**：提供一致的调用方式
- **类型安全**：支持 TypeScript 泛型，提供类型推断
- **参数标准化**：GET 请求参数自动转为 query string

## 整体架构优势

### 1. 关注点分离
- **业务代码**：只需关注数据处理和业务逻辑
- **请求工具**：处理网络请求、错误处理、状态管理
- **UI 组件**：专注于界面展示和用户交互

### 2. 代码复用性
- 所有 API 调用共享相同的错误处理逻辑
- 统一的加载状态管理
- 自动化的认证处理

### 3. 维护性
- 集中配置，修改一处影响全局
- 统一的错误处理策略
- 清晰的代码结构和职责划分

## 使用示例

### 基础用法
```typescript
// 在组件中使用
import request from '@/utils/request'

// GET 请求
const getUserList = async () => {
  try {
    const users = await request.get('/api/users', { page: 1, size: 10 })
    console.log(users) // 直接得到业务数据，无需处理 response.data.data
  } catch (error) {
    // 错误已经被拦截器处理，这里可以做额外的业务处理
  }
}

// POST 请求
const createUser = async (userData) => {
  try {
    const result = await request.post('/api/users', userData)
    return result
  } catch (error) {
    // 错误处理
  }
}
```

### 类型安全用法
```typescript
interface User {
  id: number
  name: string
  email: string
}

// 带类型的请求
const getUser = async (id: number): Promise<User> => {
  return request.get<User>(`/api/users/${id}`, {})
}
```

## 可能的改进点

### 1. 错误处理增强
```typescript
// 可以添加更细粒度的错误处理
const errorHandlers = {
  401: () => { /* 未授权处理 */ },
  403: () => { /* 权限不足处理 */ },
  500: () => { /* 服务器错误处理 */ }
}
```

### 2. 请求重试机制
```typescript
// 可以添加自动重试功能
const retryConfig = {
  retries: 3,
  retryDelay: 1000
}
```

### 3. 请求缓存
```typescript
// 可以添加请求缓存机制
const cacheConfig = {
  enableCache: true,
  cacheTime: 5 * 60 * 1000 // 5分钟
}
```

## 总结

这个 request.ts 封装体现了以下设计原则：

1. **单一职责原则**：每个拦截器只处理特定的关注点
2. **开闭原则**：对扩展开放，对修改封闭
3. **依赖倒置原则**：业务代码依赖抽象接口，不依赖具体实现
4. **DRY 原则**：避免重复代码，统一处理公共逻辑

通过这种封装方式，实现了网络请求的标准化、自动化和统一化，大大提升了开发效率和代码质量。
