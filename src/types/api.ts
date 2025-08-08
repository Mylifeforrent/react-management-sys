
//eslintrc.cjs     '@typescript-eslint/no-namespace': 'off' 就可以让我们这里定义namespace不报错了
export namespace LoginType {
  // 登录请求参数接口（包含安全参数）
  export interface params {
    username: string;
    password: string;
    nonce?: string;      // 随机数，防重放攻击
    timestamp?: number;  // 时间戳，防重放攻击
  }

  // 用户信息接口
  export interface UserInfo {
    id: number;
    username: string;
    email: string;
    role: string;
    status: string;
  }

  // 登录响应数据接口
  export interface LoginResponseData {
    token: string;
    user: UserInfo;
  }

  // 完整的登录响应接口
  export interface loginResponse {
    code: number;
    message: string;
    data: LoginResponseData;
  }
}

// 通用API响应接口
export interface IResponse<T = any> {
  code: number | string,
  message: string,
  data: T,
  success: boolean
}

// 用户管理
export namespace User {
  // export interface Params extends PageParams {
  //   userId?: number
  //   userName?: string
  //   state?: number
  // }

  export interface SearchParams {
    userId?: number
    userName?: string
    state?: number
  }
  export interface UserItem {
    _id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    mobile: string
    job: string
    role: number
    roleList: string
    createId: number
    deptName: string
    userImg: string
  }
  export interface CreateParams {
    userName: string
    userEmail: string
    mobile?: number
    deptId: string
    job?: string
    state?: number
    roleList: string[]
    userImg: string
  }
  export interface EditParams extends CreateParams {
    userId: number
  }
}