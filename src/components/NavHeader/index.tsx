import { MenuFoldOutlined, SmileOutlined } from "@ant-design/icons"
import { Breadcrumb, Dropdown, MenuProps, Switch } from "antd"
import styles from './index.module.less'
const NavHeader = () => {

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
    key: '1',
    label: "sss"
  },
  {
    key: '2',
    label: "hhh"
  }
];

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} style={{marginLeft: 10}}/>
      </div>
      <div className="right">
        <Switch checkedChildren="绿色" unCheckedChildren="默认" defaultChecked style={{ marginRight: 10}}/>
        <Dropdown menu={{ items }} trigger={['click']}>
          <span className={styles.nickName}>JackMa</span>
        </Dropdown>
      </div>
    </div>
  )
} 

export default NavHeader