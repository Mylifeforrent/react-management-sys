import { LoginType } from "@/types/api"
import request from "@/utils/request"

/**
 * 登录相关API模块
 * 现在完全无侵入性，Mock功能在axios拦截器层面处理
 */
const loginAPI = {
  /**
   * 用户登录接口
   * @param params 登录参数（用户名和密码）
   * @returns Promise 返回登录结果
   */
  login: (params: LoginType.params) => {
    return request.post('/auth/login', params)
  }
}

export default loginAPI;
