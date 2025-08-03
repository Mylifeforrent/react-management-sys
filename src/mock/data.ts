// Mock数据模块 - 用于模拟后端返回的数据
// 这里定义了各种API接口的模拟响应数据

import { LoginType } from "@/types/api"

/**
 * 登录相关的Mock数据
 */
export const loginMockData = {
  // 模拟登录成功的响应数据
  success: {
    code: 200,
    message: '登录成功',
    data: {
      token: 'mock-jwt-token-123456789',
      userInfo: {
        id: 1,
        username: 'admin',
        nickname: '管理员',
        email: 'admin@example.com',
        avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
        role: 'admin',
        permissions: ['user:read', 'user:write', 'system:admin']
      }
    }
  },

  // 模拟登录失败的响应数据
  error: {
    code: 401,
    message: '用户名或密码错误',
    data: null
  }
}

/**
 * 其他API的Mock数据可以在这里继续添加
 * 例如：用户列表、菜单数据等
 */
export const userMockData = {
  list: {
    code: 200,
    message: '获取成功',
    data: {
      list: [
        { id: 1, username: 'admin', nickname: '管理员', status: 1 },
        { id: 2, username: 'user', nickname: '普通用户', status: 1 }
      ],
      total: 2
    }
  }
}
