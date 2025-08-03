# Mock数据系统使用指南

## 📖 什么是Mock系统？

Mock系统是一个**基于axios拦截器的请求拦截器**，它的作用就像一个"假的后端服务器"。当你的前端代码发送API请求时，Mock系统会在axios请求拦截器中拦截这些请求，然后返回预先准备好的假数据，完全模拟真实的HTTP请求链路。

**简单理解：**
- 正常情况：前端 → axios请求拦截器 → 发送HTTP请求 → 后端服务器 → axios响应拦截器 → 返回真实数据
- 使用Mock：前端 → axios请求拦截器 → Mock拦截 → 直接返回假数据 → axios响应拦截器 → 返回Mock数据

## 🎯 新版本的优势

1. **完全无侵入性**：API代码保持原样，不需要任何修改
2. **完整的请求链路模拟**：Mock数据会经过完整的axios拦截器处理
3. **真实的网络体验**：包含网络延迟、loading状态等
4. **统一的错误处理**：Mock错误也会触发axios的错误处理逻辑

## 🎯 为什么要使用Mock系统？

1. **独立开发**：不需要等待后端API开发完成，前端可以先用假数据进行开发
2. **稳定测试**：假数据是固定的，便于测试各种场景
3. **离线开发**：没有网络也能正常开发
4. **快速原型**：快速搭建功能原型进行演示

## 📁 文件结构说明

```
src/mock/
├── index.ts        # 入口文件，统一导出
├── data.ts         # Mock数据定义
├── interceptor.ts  # 拦截器逻辑
└── README.md       # 使用说明（本文件）
```

## 🚀 快速开始

### 1. 开启Mock功能

在 `src/mock/axios-mock.ts` 中：

```typescript
export const MOCK_CONFIG = {
  enabled: true,  // 改为 true 开启Mock
  delay: 500,     // 模拟网络延迟500毫秒
}
```

### 2. 测试登录功能

现在你可以在登录页面使用以下测试账号：

- **用户名**: `admin`
- **密码**: `123456`

输入正确账号会返回成功，其他账号会返回失败。

### 3. 在浏览器控制台中切换Mock

打开浏览器开发者工具，在控制台输入：

```javascript
window.toggleAxiosMock()  // 切换Mock开启/关闭状态
```

## 📝 如何添加新的Mock数据

### 步骤1：在 `data.ts` 中添加Mock数据

```typescript
// 例如添加用户列表的Mock数据
export const userListMockData = {
  success: {
    code: 200,
    message: '获取成功',
    data: {
      list: [
        { id: 1, name: '张三', age: 25 },
        { id: 2, name: '李四', age: 30 }
      ],
      total: 2
    }
  }
}
```

### 步骤2：在 `interceptor.ts` 中添加路由

```typescript
const mockRoutes: Record<string, any> = {
  // 现有的路由...

  // 新添加的路由
  'GET:/users/list': () => {
    return userListMockData.success
  }
}
```

### 步骤3：在API模块中使用

```typescript
const userAPI = {
  getUserList: async () => {
    // 先尝试Mock拦截
    const mockResult = await mockInterceptor('GET', '/users/list')

    if (mockResult !== null) {
      return mockResult
    }

    // 没有Mock数据时调用真实API
    return request.get('/users/list')
  }
}
```

## 🔧 高级用法

### 1. 根据参数返回不同数据

```typescript
'POST:/users/search': (params: any) => {
  if (params.keyword === 'admin') {
    return { code: 200, data: [/* 管理员数据 */] }
  } else {
    return { code: 200, data: [/* 普通用户数据 */] }
  }
}
```

### 2. 模拟错误情况

```typescript
'POST:/users/delete': (params: any) => {
  if (params.id === 1) {
    return { code: 403, message: '不能删除管理员账号' }
  } else {
    return { code: 200, message: '删除成功' }
  }
}
```

### 3. 动态延迟时间

```typescript
// 在interceptor.ts中修改延迟逻辑
const delay = (ms: number) => {
  // 可以根据不同API设置不同延迟
  const customDelay = url.includes('/upload') ? 2000 : ms
  return new Promise(resolve => setTimeout(resolve, customDelay))
}
```

## 🐛 调试技巧

### 1. 查看Mock拦截日志

当Mock拦截器工作时，会在浏览器控制台输出日志：

```
🎭 Mock拦截: POST /users/login {username: "admin", password: "123456"}
🎭 Mock响应: {code: 200, message: "登录成功", data: {...}}
```

### 2. 临时关闭Mock

```javascript
// 在控制台中临时关闭Mock
window.toggleMock()  // 如果当前是开启状态，会关闭Mock
```

### 3. 检查Mock配置

```javascript
// 在控制台中查看当前Mock状态
console.log('Mock状态:', window.MOCK_CONFIG?.enabled)
```

## ⚠️ 注意事项

1. **生产环境记得关闭Mock**：部署到生产环境前，确保 `MOCK_CONFIG.enabled` 设置为 `false`

2. **保持数据格式一致**：Mock数据的格式应该与真实API返回的格式保持一致

3. **及时更新Mock数据**：当后端API格式发生变化时，记得同步更新Mock数据

4. **不要在Mock中写复杂逻辑**：Mock应该保持简单，复杂的业务逻辑应该在真实API中实现

## 🎉 总结

Mock系统让你可以：
- ✅ 独立进行前端开发
- ✅ 快速测试各种场景
- ✅ 提高开发效率
- ✅ 减少对后端的依赖

现在你可以愉快地使用Mock数据进行开发了！如果有任何问题，可以查看控制台的日志信息来调试。
