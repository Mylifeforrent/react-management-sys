import { formatMoney, toLocalDate } from "@/utils";
import { showLoading } from "@/utils/loading";
import request from '@/utils/request'
import { Button } from "antd";

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
 */
export default function Welcome() {
  return (
    <div className="welcome">
      welcome
      <div>
        <Button onClick={handleClick}>测试</Button>
      </div>
    </div>
  );
}
