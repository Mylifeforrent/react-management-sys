import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavLink, useNavigate } from 'react-router'

function App() {
  const [count, setCount] = useState(0)
  // useNavigate必须在函数组建里面，不可以在外面，也不可以在if里面，而且在函数组建上层定义
  const navigate = useNavigate()
  const handleClick = () => {
    // 编程方式动态跳转
    navigate('/react')
  }
  return (
    <>
      <div>
        <NavLink to='/vite'>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </NavLink>
        <NavLink to={'/react'}>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </NavLink>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={handleClick}>点击跳转</button>
      </div>
    </>
  )
}

export default App
