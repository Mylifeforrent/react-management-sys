// 导入依赖模块
import { message } from 'antd' // Ant Design 的消息提示组件
import axios, { AxiosError } from 'axios' // HTTP 请求库和错误类型
import { hideLoading, showLoading } from './loading' // 自定义的加载状态管理工具
import storage from './storage'

/**
 * 创建 axios 实例
 * 统一配置请求的基础参数
 */
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 8000, // 请求超时时间：8秒
  timeoutErrorMessage: '请求超时，请稍后再试', // 超时错误提示信息
  withCredentials: true, // 允许跨域请求携带凭证（如 cookies）
  headers: {
    icode: '' // 自定义请求头，可能用于接口验证码或标识
  }
})

/**
 * 请求拦截器
 * 在每个请求发送前执行，用于统一处理请求配置
 */
instance.interceptors.request.use(
  config => {
    // 显示全局加载状态
    showLoading()

    // 自动添加用户认证 token
    // 从本地存储中获取用户登录凭证
    const token = storage.get('token')
    if (token) {
      // 如果存在 token，则添加到请求头的 Authorization 字段
      config.headers.Authorization = 'Token ' + token
    }
    if (import.meta.env.VITE_APP_MOCK === 'true') {
      config.baseURL = import.meta.env.VITE_APP_MOCK_API
    } else {
      config.baseURL = import.meta.env.VITE_APP_BASE_URL
    }

    // 返回处理后的配置对象
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    // 请求配置出错时的处理
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 * 在每个响应返回后执行，用于统一处理响应数据和错误
 */
instance.interceptors.response.use(
  response => {
    // 隐藏全局加载状态
    hideLoading()

    // 获取响应数据
    const data = response.data

    // 特殊处理：如果是文件下载请求（blob 类型），直接返回响应对象
    if (response.config.responseType === 'blob') return response

    // 业务错误处理
    if (data.code === 500001) {
      // 认证失败：token 过期或无效
      message.error(data.msg) // 显示错误消息
      localStorage.removeItem('token') // 清除本地 token
      // location.href = '/login' // 重定向到登录页面
    } else if (data.code !== 0) {
      // 其他业务错误：接口返回非成功状态码
      message.error(data.msg) // 显示错误消息
      return Promise.reject(data) // 抛出错误，让调用方处理
    }

    // 请求成功：返回业务数据部分
    return data.data
  },
  (error) => {
    // 网络错误或其他异常处理
    hideLoading() // 隐藏加载状态
    message.error(error.message) // 显示错误消息
    return Promise.reject(error.message) // 抛出错误信息
  }
)

/**
 * 导出封装好的请求方法
 * 提供统一的 API 调用接口
 */
export default {
  /**
   * GET 请求方法
   * @param url 请求地址
   * @param params 查询参数对象
   * @returns Promise<any> 返回处理后的响应数据
   */
  get<T>(url: string, params: any): Promise<T>{
    return instance.get(url, { params })
  },

  /**
   * POST 请求方法
   * @param url 请求地址
   * @param params 请求体数据
   * @returns Promise<any> 返回处理后的响应数据
   */
  post<T>(url: string, params: any): Promise<T>{
    return instance.post(url, params)
  }
}
