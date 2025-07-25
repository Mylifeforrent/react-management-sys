import { Link, Navigate, useRoutes } from "react-router"
import App from "./App"

export function BaseRouter() {
  const routes = useRoutes([
    { path: "/", element: <App /> },
    { path: "/react", element: <ReactDemo /> },
    { path: "/vite", element: <Vite /> },
    { path: "/apple", element: <Apple /> },
    { path: "*", element: <NotFound /> },
  ])
  return routes
}

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
  return <h2>this is for apple</h2>
}
