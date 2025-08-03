// 基于axios拦截器的Mock系统
// 这个系统会在axios请求拦截器中工作，完全模拟真实的HTTP请求链路

import { LoginType } from "@/types/api"
import { loginMockData, userMockData } from "./data"

/**
 * Mock配置
 */
export const MOCK_CONFIG = {
  enabled: true, // 是否启用Mock功能
  delay: 10,    // 模拟网络延迟（毫秒）
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
  'POST:/users/login': (data: LoginType.params) => {
    // 模拟登录逻辑：如果用户名是admin且密码是123456，返回成功，否则返回失败
    if (data.username === 'admin' && data.password === '123456') {
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
 * axios请求拦截器Mock处理函数
 * 这个函数会在axios请求拦截器中被调用
 * 如果匹配到Mock路由，会直接返回Mock响应，不发送真实请求
 *
 * @param config axios请求配置
 * @returns Promise<any> 如果匹配到Mock路由返回Mock响应，否则返回null
 */
export const axiosRequestMockHandler = async (config: any): Promise<any> => {
  // 如果Mock功能未启用，直接返回null，不进行拦截
  if (!MOCK_CONFIG.enabled) {
    console.log('🎭 Mock功能未启用，跳过拦截')
    return null
  }

  // 构造路由键，格式为 "METHOD:URL"
  const method = config.method?.toUpperCase() || 'GET'
  const url = config.url || ''
  const routeKey = `${method}:${url}`

  console.log(`🎭 检查Mock路由: ${routeKey}`)
  console.log(`🎭 检查Mockparam: ${JSON.stringify(config)}`)
  console.log(`🎭 检查Mock param data: ${JSON.stringify(config.data)}`)
  console.log(`🎭 检查Mock param paramas: ${JSON.stringify(config.params)}`)

  // 查找是否有对应的Mock路由
  const mockHandler = mockRoutes[routeKey]

  if (mockHandler) {
    console.log(`🎭 axios Mock拦截: ${method} ${url}`, config.data || config.params)

    // 模拟网络延迟
    await delay(MOCK_CONFIG.delay)

    // 执行Mock处理函数并返回结果
    const mockData = mockHandler(config.data || config.params)

    console.log(`🎭 axios Mock响应:`, mockData)

    // 直接返回Mock数据，让请求拦截器处理成axios响应格式
    return mockData
  }

  console.log(`🎭 未找到Mock路由: ${routeKey}，继续真实请求`)
  // 如果没有找到对应的Mock路由，返回null表示不拦截
  return null
}

/**
 * 开发工具函数：用于在控制台中切换Mock功能
 * 在浏览器控制台中可以调用 window.toggleAxiosMock() 来开启/关闭Mock
 */
if (typeof window !== 'undefined') {
  (window as any).toggleAxiosMock = () => {
    MOCK_CONFIG.enabled = !MOCK_CONFIG.enabled
    console.log(`axios Mock功能已${MOCK_CONFIG.enabled ? '开启' : '关闭'}`)
  }

  // 暴露Mock配置到全局，方便调试
  ;(window as any).AXIOS_MOCK_CONFIG = MOCK_CONFIG
}
