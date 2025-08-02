import path from "path";

import { createBrowserRouter, createHashRouter, Navigate, useRoutes } from "react-router";
//这种。。/写法不友好，我们通过vite.config.js配置别名 /src 用@代替， 这里就可以使用上了
// import Login from "../views/Login";
// import Welcome from "../views/Welcome";
// import Error404 from "../views/Error404";
// import Error403 from "../views/Error403";
//会发现虽然报错，但是可以运行，主要是我们ts没有配置好，需要改一下ts的配置，主要是tsconfig.json配置如下
// "baseUrl": "./",
//       "paths": {
//         "@/*": ["src/*"],
//         "react-management-sys/*": ["src/*"]。这个应该没关系
//       }
import Login from "@/views/login/index";
import Welcome from "@/views/welcome";
import Error404 from "@/views/error404";
import Error403 from "@/views/error403";


const routerPath = [
  {
    path: "/",
    element: <Welcome/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/404",
    element: <Error404/>
  },
  {
    path: "/403",
    element: <Error403/>
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />
  }
]

export default function Router() {
  return useRoutes(routerPath);
}

// const rootrouter = createBrowserRouter(router)

// export default {rootrouter, Router};
// export default { Router};
