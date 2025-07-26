import { Button, Result } from "antd"
import { useNavigate } from "react-router";

const Error404 = () => {

  const navigate = useNavigate();
  //useNavigate不可以放在handleClick中，因为每次handleClick都会重新创建一个useNavigate，这样会导致无限循环
  //useNavigate是一个hook，不能在函数中调用，只能在组件的顶层调用
  //如果需要在函数中使用navigate，可以将其提取到组件的顶层
  // const navigate = useNavigate(); --- IGNORE ---
  const handleClick = () => {
    navigate('/');
  }

  return <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={handleClick}>Back Home</Button>}
  />
}

export default Error404;
