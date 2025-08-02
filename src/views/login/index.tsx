import { useEffect } from "react";
import request from "@/utils/request";
import axios from "axios";
import { showLoading } from "@/utils/loading";
import styles from './index.module.less'
import { Button, Form, Input } from "antd";


export default function Login() {

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
  };
  const loading = false;

  return (
    <div className={styles.login}>
        <div className={styles.loginWrapper}>
          <div className={styles.title}>系统登录</div>
          <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
            <Form.Item name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>

            <Form.Item name='userPwd' rules={[{ required: true, message: 'Please input your password!' }]}>
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
