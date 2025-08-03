// Mock拦截器模块 - 用于拦截API请求并返回模拟数据
// 这个模块的作用是在开发阶段替代真实的后端API调用

import { LoginType } from "@/types/api"
import { loginMockData, userMockData } from "./data"

/**
 * Mock配置 - 控制是否启用Mock功能
 * 在开发环境中可以设置为true来使用Mock数据
 * 在生产环境中应该设置为false来使用真实API
 */
export const MOCK_CONFIG = {
  enabled: true, // 是否启用Mock功能
  delay: 500,    // 模拟网络延迟（毫秒）
}

/**
 * 模拟网络延迟的工具函数
 * @param ms 延迟时间（毫秒）
 * @returns Promise
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Mock路由映射表
 * 这里定义了哪些API路径应该返回什么Mock数据
 */
const mockRoutes: Record<string, any> = {
  // POST请求的路由
  'POST:/users/login': (params: LoginType.params) => {
    // 模拟登录逻辑：如果用户名是admin且密码是123456，返回成功，否则返回失败
    if (params.username === 'admin' && params.password === '123456') {
      return loginMockData.success
    } else {
      return loginMockData.error
    }
  },

  // GET请求的路由示例
  'GET:/users/list': () => {
    return userMockData.list
  }

  // 可以继续添加其他API的Mock路由...
}

/**
 * Mock拦截器主函数
 * 这个函数会检查请求的URL和方法，如果匹配到Mock路由，就返回Mock数据
 *
 * @param method HTTP方法（GET, POST, PUT, DELETE等）
 * @param url 请求的URL路径
 * @param params 请求参数
 * @returns Promise<any> 返回Mock数据或null（表示不拦截）
 */
export const mockInterceptor = async (
  method: string,
  url: string,
  params?: any
): Promise<any> => {
  // 如果Mock功能未启用，直接返回null，不进行拦截
  if (!MOCK_CONFIG.enabled) {
    return null
  }

  // 构造路由键，格式为 "METHOD:URL"
  const routeKey = `${method.toUpperCase()}:${url}`

  // 查找是否有对应的Mock路由
  const mockHandler = mockRoutes[routeKey]

  if (mockHandler) {
    console.log(`🎭 Mock拦截: ${method} ${url}`, params)

    // 模拟网络延迟
    await delay(MOCK_CONFIG.delay)

    // 执行Mock处理函数并返回结果
    const result = mockHandler(params)

    console.log(`🎭 Mock响应:`, result)

    // 模拟axios响应拦截器的处理逻辑
    if (result.code === 200) {
      console.log("🎭 Mock模拟response data:", result)
      return Promise.resolve(result)
    } else if (result.code !== 0) {
      console.log("🎭 Mock模拟error data:", result)
      // 这里可以选择是否要显示错误消息
      // message.error(result.message) // 如果需要的话可以取消注释
      return Promise.reject(result)
    }

    return result
  }

  // 如果没有找到对应的Mock路由，返回null表示不拦截
  return null
}

/**
 * 开发工具函数：用于在控制台中切换Mock功能
 * 在浏览器控制台中可以调用 window.toggleMock() 来开启/关闭Mock
 */
if (typeof window !== 'undefined') {
  (window as any).toggleMock = () => {
    MOCK_CONFIG.enabled = !MOCK_CONFIG.enabled
    console.log(`Mock功能已${MOCK_CONFIG.enabled ? '开启' : '关闭'}`)
  }
}
