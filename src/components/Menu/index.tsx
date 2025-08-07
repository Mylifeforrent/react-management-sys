import { ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import styles from "./index.module.less"
import { useNavigate } from "react-router-dom"
const SideMenu = () => {


  const items = [
    { key: '1', icon: <DesktopOutlined />, label: '工作台' },
    { key: '2', icon: <SettingOutlined />, label: '系统管理',
      children: [
        { key: '21', label: 'Option 5' ,icon: <TeamOutlined/>},
       
      ]
    }
  ]

  const navigate = useNavigate()
  const handleClickLogo = () => {
    navigate('/welcome')
  }

    return (
        <div>
          <div className={styles.logo} onClick={handleClickLogo}>
            <img className={styles.img} src='/imgs/logo.png' alt='' />
            <span>货运系统</span>
          </div>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            // inlineCollapsed={collapsed}
            items={items}
          />
        </div>
    )
} 

export default SideMenu