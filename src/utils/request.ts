// 导入依赖模块
import { message } from 'antd' // Ant Design 的消息提示组件
import axios, { AxiosError } from 'axios' // HTTP 请求库和错误类型
import { hideLoading, showLoading } from './loading' // 自定义的加载状态管理工具
import storage from './storage'
import { IResponse } from '@/types/api'

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
    // config.headers.icode = 'xxx'
    const token = storage.get('token')
    if (token) {
      // 如果存在 token，则添加到请求头的 Authorization 字段
      config.headers.Authorization = 'Token:: ' + token
    }

    // 设置请求基础URL
    config.baseURL = import.meta.env.VITE_APP_BASE_URL

    // 返回处理后的配置对象
    return config
  },
  error => {
    // 请求配置出错时的处理
    console.log('请求配置出错：', error)
    hideLoading()
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

    // 处理响应数据
    return handleResponseData(response)
  },
  (error: AxiosError) => {
    // 隐藏加载状态
    hideLoading()

    console.log('请求失败:', error.message)

    // 处理不同类型的错误
    let errorMessage = '请求失败'
    
    if (error.response) {
      // 服务器返回了错误状态码
      const status = error.response.status
      switch (status) {
        case 401:
          errorMessage = '未授权，请重新登录'
          localStorage.removeItem('token')
          // 可以在这里跳转到登录页
          break
        case 403:
          errorMessage = '拒绝访问'
          break
        case 404:
          errorMessage = '请求的资源不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        default:
          errorMessage = `请求失败 (${status})`
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      errorMessage = '网络连接失败，请检查网络'
    } else {
      // 其他错误
      errorMessage = error.message || '请求配置错误'
    }

    message.error(errorMessage)
    return Promise.reject(error)
  }
)

/**
 * 统一处理响应数据的函数
 * @param response axios响应对象
 * @returns 处理后的数据
 */
function handleResponseData(response: any) {
  console.log('handleResponseData response:', response)
  
  // 获取响应数据
  const data = response.data

  // 特殊处理：如果是文件下载请求（blob 类型），直接返回响应对象
  if (response.config.responseType === 'blob') return response

  // 业务错误处理
  if (data.code === 500001) {
    // 认证失败：token 过期或无效
    message.error(data.msg || data.message)
    localStorage.removeItem('token')
    // 可以在这里跳转到登录页
    return Promise.reject(data)
  } else if (data.code === 200 || data.status === 'success') {
    console.log("response data:", data)
    // 成功响应，返回数据部分
    return data.data || data
  } else if (data.code !== 0 && data.code !== 200) {
    // 其他业务错误
    console.log("error data:", data)
    message.error(data.msg || data.message || '请求失败')
    return Promise.reject(data)
  }

  // 默认返回数据
  return data.data || data
}

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
