import React, { useEffect } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Watermark } from 'antd';
import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
import SideMenu from '@/components/Menu';
import { Outlet } from 'react-router-dom';
import styles from "./index.module.less"
import api from '@/api'
import storage from '@/utils/storage';

const { Header, Content, Footer, Sider } = Layout;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 这样单独定义一下才可以在useeffect里面getpromiase，不然直接
  //在useeffect使用api。getuserinfo是会报错的，没办法使用promise语法
  const getUserInfo = async () => {
    const data = await api.getUserInfo(); 
    storage.set("userinfo" ,data)
    console.log("userInfo:" + data);
  };

  useEffect(() => {
    getUserInfo()
  }, []);

  return (
    <Watermark content='test water mark'>
    <Layout>
      <Sider theme='dark'>
        <div className="demo-logo-vertical" />
        {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} /> */}
        <SideMenu/>
      </Sider>
      <Layout>
        {/* 这种写法要注意框架的header组件高度如果和自己定义的navheader高度不一样，样式就不能很好的对其。所以要么把header组件style高度设置一下保持和navheader一样，要么把navheader组件高度设置和
        header组件一样，要么直接不用header组件 */}
        {/* <Header style={{ padding: 0, background: colorBgContainer }} >
          <NavHeader />
        </Header> */}
          <NavHeader />
        {/* header */}
        {/* <Content style={{ margin: '24px 16px 0' }}> 如果这里使用了margin，那么welcome页面那里高度除了减去header，footer之外，还要剪去margin的高度 */}
        <Content className={styles.content}>
          {/* 内容区域称作wrapper，所以这里搞一个wrapper保存内容的 */}
          <div className={styles.wrapper}>
            <Outlet></Outlet>

          </div>
          <NavFooter/>
          {/* footer当作内容区域一起放进去，这样内容区域高度welcome页面那里height需要减去这个footer的高度才可以 */}
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
    </Watermark>
  );
};

export default App;