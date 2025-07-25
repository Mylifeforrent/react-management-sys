import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, createBrowserRouter, HashRouter, Link, Navigate, Route, RouterProvider, Routes } from 'react-router'
import { BaseRouter } from './router1'
import { MyBrowserRouter } from './router2'
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

// 第一种方式
//访问方式 http://127.0.0.1:5173/react， http://127.0.0.1:5173
// createRoot(document.getElementById('root')!).render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/react" element={<ReactDemo />} />
//     </Routes>
//   </BrowserRouter>
// )

// 第二种方式
//访问方式 http://127.0.0.1:5173/#/react， http://127.0.0.1:5173/#/. 这个时候如果你访问http://127.0.0.1:5173/react，
// 那么就会返回主页，因为他不是一个路由的有效路径，所以返回主页去了，但是如果你使用了browserrouter，你会发现如果你给的是一个无效路径
//比如http://127.0.0.1:5173/react333， 它不会返回主页，相反hashrouter就会返回主页，这就是处理错误路由的区别。其实可以理解为hashrouter它
//的算法应该是有类似if else default的机制，匹配不到走默认，估计是这个原因，毕竟是hash算法嘛，到时候问问ai
// createRoot(document.getElementById('root')!).render(
//   <HashRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/react" element={<ReactDemo />} />
//       <Route path="/vite" element={<Vite />} />
//       {/* // Navigate重定向 */}
//       <Route path="/test" element={<Navigate to={'/react'} />} />
//       {/* 页面里面使用navigate */}
//       <Route path="/test2" element={<Test2></Test2>} />
//       <Route path="/*" element={<NotFound/>} />

//     </Routes>
//   </HashRouter>
// )

//第三种方式，加载routes组件,首先定义好父容器比如hashrouter或者browserrouter，然后在里面使用useRoutes来加载路由
// createRoot(document.getElementById('root')!).render(
//   <HashRouter>
//     <BaseRouter/>
//   </HashRouter>
// )


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={MyBrowserRouter}/>
)


