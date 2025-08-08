import { formatMoney, toLocalDate } from "@/utils";
import { showLoading } from "@/utils/loading";
import request from '@/utils/request'
import { Button } from "antd";
import styles from "./index.module.less"

/**
 * 处理测试按钮点击事件
 * 修复：添加了第二个参数 params，即使为空对象也需要传递
 * 原因：request.get 方法定义需要两个参数 (url: string, params: any)
 */
const handleClick = () => {
  // 修复前：request.get("/api/test"); // 缺少第二个参数
  // 修复后：添加空对象作为第二个参数，表示没有查询参数
  request.get("/api/test", {});

  console.log('formatmoney test' + formatMoney(1234512452))
  console.log('current date time:' + toLocalDate())
}
console.log(import.meta.env)
/**
 * 欢迎页面组件
 * 包含一个测试按钮，用于验证 API 请求功能
 * 
 * 登录以后在首页获取用户信息，
 * 1.为什么不是登录接口获取用户信息？ 
 * 答：如果这样，在使用redux状态框架的时候页面刷新用户信息可能丢失
 * 1.1 使用redux时候，那我们可以把获取到的数据用storage存储起来啊？ 
 * 答： 如果有人在storage改动了数据，把你的用户名，菜单权限列表进行改动，可能出现安全漏洞，我们又无法控制，这样是不行的。
 * 
 * 所以需要在用户信息接口单独获取一次，也就是首页里面拉取。一定要把这个接口触发放到公共组件（header，footer，sidemenu）里面去，刷新的时候才会进行触发
 * 这里我们选择layout组件里面去
 */


export default function Welcome() {
  return (
    //每一个页面定义一个根class，也就是根div进行包裹，保证不污染
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>Welcome</div>
        <div className={styles.title}>React18 General Management Sys</div>
        <div className={styles.desc}>React18+ReactRouter6.0+AntD5.4+TypeScript5.0+Vite</div>
      </div>
      <div className={styles.img}>

      </div>
    </div>
  );
}
