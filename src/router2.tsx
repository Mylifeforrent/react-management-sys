import { createBrowserRouter, Link, Navigate, useRoutes } from "react-router"
import App from "./App"

function ReactDemo() {
  return <h2>welcome to learn react router<Link to={'..'}>back</Link></h2>

  // navlink link基本一样，区别就是场景，navlink是导航用，link是普通连接使用，本质二者都会渲染为a标签

}
const Vite = () => {
  return <h2>welcome to vite</h2>
}
const Test2 = () => {
  return <h2>welcome to test2 {<Navigate to={'/react'}></Navigate>}</h2>
}
const NotFound = () => {
  return <h2>404 page not found</h2>
}

const Apple = () => {
  return <h2>this is for apple2</h2>
}

//这是不是useRoutes那样使用了路由组件，而是创建了一个基础的路由组件，和自带的browserrouter一样的地位
export const MyBrowserRouter = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/react", element: <ReactDemo /> },
  { path: "/vite", element: <Vite /> },
  { path: "/apple", element: <Apple /> },
  { path: "*", element: <NotFound /> },
])



