import { MenuFoldOutlined, SmileOutlined } from "@ant-design/icons"
import { Breadcrumb, Dropdown, MenuProps, Switch } from "antd"
import styles from './index.module.less'
import storage from "@/utils/storage"
import { store } from "@/store"
const NavHeader = () => {

  const userInfo = storage.get("userinfo")
  const breadList = [
    {
      title: "首页"
    },
    {
      title: "Home"
    },
    {
      title: "About"
    }
  ]

  const items: MenuProps['items'] = [
  {
    key: 'email',
    label: "email:" + userInfo.email
  },
  {
    key: 'logout',
    label: "exit"
  }
];

const onClick: MenuProps['onClick']= ({key})=> {
  if (key === 'logout') {
    // storage.remove("token") //移除token
    store.token = ""
    // 刷新页面,添加callback，下次用户登录时候可以记住这个页面，然后跳转回当前页面
    window.location.href = "/login?callback=" + encodeURIComponent(location.href)
  }
}

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} style={{marginLeft: 10}}/>
      </div>
      <div className="right">
        <Switch checkedChildren="绿色" unCheckedChildren="默认" defaultChecked style={{ marginRight: 10}}/>
        <Dropdown menu={{ items,onClick }} trigger={['click']}>
          <span className={styles.nickName}>{store.userInfo.username}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
