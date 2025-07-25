import { createBrowserRouter, Form, Link, Navigate, Outlet, redirect, useParams, useRoutes } from "react-router"
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

const Order = () => {
  const params = useParams()
  return <h2>this is order page index:{params.orderId}</h2>
}

const Goods = () => {
  const params = useParams()
  return (
    <div>
      <h2>this is for goods page index: {params.goodId}</h2>
      <p>
        <span>goods {params.goodId}</span>
        <span>order {params.orderId}</span>
      </p>
    </div>
  )
}

const Goods2 = () => {
  const params = useParams()
  return (
    <div>
      <h2>this is for goods2 page</h2>
      {/* 之所以需要outlet，是因为访问到goods/list路径的时候，只会把定义好的父组件渲染出来，对应的子路由返回的element需要给父组件一个容器，才能在父组件里面加载进来 */}
      <Outlet />
    </div>
  )
}


const Loader = (param:any) => {
  //1.loader可以通过params拿到对应的路由信息 比如order/:orderId 路径下的orderid
  //2. 可以返回一些信息，这样在他执行完之后，紧接着的子路由组件就可以通过useLoaderData来获取到这些信息
  // return xxx
  //3. loader可以做一些拦截操作，比如判断用户是否登录，如果没有登录就重定向到登录页面
  //4. loader可以返回一个promise，这样就可以在异步加载数据的时候使用
  // return fetch(`{xxx}.json`)
  return redirect('/login')
}

const Login = () => {
  return <div>
    <Form method="post" action="/login">
      <h2>login page</h2>
      <div>
        <label>username: </label><input type="text" placeholder="username" />
      </div>
      <div>
        <label>password: </label><input type="password" placeholder="password" />
      </div>
      <button>login</button>
    </Form>
  </div>
}

//这是不是useRoutes那样使用了路由组件，而是创建了一个基础的路由组件，和自带的browserrouter一样的地位
export const MyBrowserRouter = createBrowserRouter(
  [
    { path: "/", element: <App /> },
    { path: "/react", element: <ReactDemo /> },
    { path: "/vite", element: <Vite /> },
    { path: "/apple", element: <Apple /> },
    { path: "/goods/:goodId/order/:orderId", element: <Goods /> },
    { path: "/goods", element: <Goods2 /> , children: [
      {
        //路径不要加/，因为这里是相对理由，加/就代表根地址了
        path:'list',
        element: (
          // 注意这里可以直接写jsx代码，不一定需要从外面引入组件，灵活一点
          <div>
            <p>good01</p>
            <p>good02</p>
          </div>
        )
      },
      {
        path:'cart',
        element: (
          <div>
            <p>iphone price 666</p>
            <p>beef 888</p>
          </div>
        )
      }
    ]},
    { path: "/order/:orderId", element: <Order /> },
    // loader可以先执行，才会执行element组件逻辑，所以有时候loader可以做一个拦截跳转的操作，比如重定向到登录页面之类的
    { path: "/loader", element: <Apple /> ,loader: Loader},
    { path: "/login", element: <Login />},
    { path: "*", element: <NotFound /> },
  ],
  { basename:'/app'}
)



