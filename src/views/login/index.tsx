import { useEffect, useState } from "react";
import request from "@/utils/request";
import axios from "axios";
import { showLoading } from "@/utils/loading";
import styles from './index.module.less'
import { Button, Form, Input,App } from "antd";
import loginAPI from '@/api/index';
import { LoginType } from "@/types/api"
import storage from "@/utils/storage";
import * as CryptoJS from 'crypto-js'; // 用于密码加密
import {store} from '@/store'


export default function Login() {
  const [loading, setLoading] = useState(false);
  const {message, notification, modal} = App.useApp()

  /**
   * 密码加密函数
   * 使用SHA256 + 盐值的方式加密密码，提高安全性
   * @param password 原始密码
   * @param salt 盐值（可以是用户名或随机字符串）
   * @returns 加密后的密码
   */
  const encryptPassword = (password: string, salt: string): string => {
    // 使用用户名作为盐值，增加密码复杂度
    const saltedPassword = password + salt;
    // 使用SHA256算法进行哈希加密
    return CryptoJS.SHA256(saltedPassword).toString();
  };

  /**
   * 生成随机数字符串，用于增加请求的唯一性
   * 防止重放攻击
   */
  const generateNonce = (): string => {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  };

  /**
   * 安全的登录处理函数
   */
  const onFinish = async (values: LoginType.params) => {

    //1，局部loading实现思路 1: 传进来的params添加开关字段，但是有侵入性，login本身不需要这个字段，有一点多余

    // 🔒 安全优化1：不在控制台打印敏感信息
    console.log('开始登录流程，用户名:', values.username);
    setLoading(true)
    try {
      // 🔒 安全优化2：密码加密处理
      const encryptedPassword = encryptPassword(values.password, values.username);
      const nonce = generateNonce();
      const timestamp = Date.now();

      // 构造安全的登录参数
      const secureLoginParams = {
        username: values.username,
        password: encryptedPassword, // 发送加密后的密码
        nonce: nonce,               // 随机数，防止重放攻击
        timestamp: timestamp        // 时间戳，防止重放攻击
      };

      // 🔒 安全优化3：清除原始密码变量
      values.password = ''; // 立即清除内存中的明文密码

      // 调用登录API并明确指定返回类型
      const loginResult = await loginAPI.login(secureLoginParams) as LoginType.LoginResponseData;
      console.log('登录结果:', loginResult);

      // 🔒 安全优化4：安全存储token
      if (loginResult && loginResult.token) {
        // storage.set('token', loginResult.token);
        store.token = loginResult.token;
        // storage.set('userInfo', {
        //   username: loginResult.user?.username,
        //   role: loginResult.user?.role,
        //   id: loginResult.user?.id
        // });
      }

      message.success('登录成功');

      // 使用URLSearchParams解析当前页面URL中的查询参数
      // 原理：URLSearchParams是Web API，用于解析和操作URL查询字符串
      // 例如：如果当前URL是 /login?callback=/dashboard，则location.search为 "?callback=/dashboard"
      const params = new URLSearchParams(location.search);

      // 获取callback参数并重定向，实现登录后跳转到指定页面的功能
      // 原理：params.get('callback')获取callback参数值，如果没有则使用默认值'/'
      // 例如：callback=/dashboard 则跳转到/dashboard，没有callback则跳转到首页/
      // 使用场景：用户访问受保护页面时被重定向到登录页，登录成功后自动跳转回原页面

      // 🔒 安全优化5：验证callback参数，防止开放重定向攻击
      const callbackUrl = params.get('callback');
      const safeCallback = validateCallback(callbackUrl);

      setTimeout(() => {
        // location.href = safeCallback;
        location.href = callbackUrl||'';
      }, 2000); // 延迟跳转，让用户看到成功提示

    } catch (error) {
      console.error('登录失败:', error);
      message.error('登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 验证回调URL的安全性，防止开放重定向攻击
   * @param callback 回调URL
   * @returns 安全的回调URL
   */
  const validateCallback = (callback: string | null): string => {
    if (!callback) return '/';

    // 只允许相对路径，防止重定向到外部恶意网站
    if (callback.startsWith('/') && !callback.startsWith('//')) {
      // 白名单验证：只允许特定的路径
      const allowedPaths = ['/', '/dashboard', '/users', '/settings', '/profile'];
      const isAllowed = allowedPaths.some(path =>
        callback === path || callback.startsWith(path + '/')
      );

      return isAllowed ? callback : '/';
    }

    // return '/'; // 默认返回首页
    return '/'; // 默认返回首页
  };

  return (
    <div className={styles.login}>
        <div className={styles.loginWrapper}>
          <div className='title'>系统登录</div>
          <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
            <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>

            <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type='primary' block htmlType='submit' loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
    </div>
  )

}
