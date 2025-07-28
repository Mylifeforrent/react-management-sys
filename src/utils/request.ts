import { message } from 'antd'
import axios, { AxiosError } from 'axios'
import { hideLoading, showLoading } from './loading'

//创建实例
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: ''
  }
})

//请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()
    //这里可以设置请求头，添加token等
    //假设我们使用localStorage来存储token
    //如果你使用的是sessionStorage或者其他存储方式，请相应修改
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Token ' + token
    }
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

//响应拦截器
instance.interceptors.response.use(
  response => {
    hideLoading()
    const data = response.data
    if (response.config.responseType === 'blob') return response
    if (data.code === 500001) {
      message.error(data.msg)
      localStorage.removeItem('token')
      location.href = '/login'
    } else if (data.code !== 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  (error) => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

export default instance
