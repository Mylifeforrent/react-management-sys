import { useState } from 'react'
import './App.css'
import { BrowserRouter, NavLink, RouterProvider, useNavigate } from 'react-router'
import Router from './router'

function App() {
  //通过路由组件定义路由
  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  )
  //这种称之为api路由， 推荐使用api路由，因为可以使用loader action等复杂的功能
  // return <RouterProvider router={rootrouter}/>
}

export default App
