import { useEffect, useState } from "react";
import request from "@/utils/request";
import axios from "axios";
import { showLoading } from "@/utils/loading";
import styles from './index.module.less'
import { Button, Form, Input, message } from "antd";
import loginAPI from '@/api/index';
import { LoginType } from "@/types/api"
import storage from "@/utils/storage";


export default function Login() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginType.params) => {
    console.log('Received values of form: ', values);
    setLoading(true);
    try {
      const data = await loginAPI.login(values)
      console.log('res data:', data)
      // storage.set('token', data)
      message.success('登录成功')
      // 使用URLSearchParams解析当前页面URL中的查询参数
      // 原理：URLSearchParams是Web API，用于解析和操作URL查询字符串
      // 例如：如果当前URL是 /login?callback=/dashboard，则location.search为 "?callback=/dashboard"
      const params = new URLSearchParams(location.search)
      
      // 获取callback参数并重定向，实现登录后跳转到指定页面的功能
      // 原理：params.get('callback')获取callback参数值，如果没有则使用默认值'/'
      // 例如：callback=/dashboard 则跳转到/dashboard，没有callback则跳转到首页/
      // 使用场景：用户访问受保护页面时被重定向到登录页，登录成功后自动跳转回原页面
      location.href = params.get('callback') || '/'
    } catch (error) {
      console.error('登录失败:', error);
    } finally {
      setLoading(false);
    }
  }

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
