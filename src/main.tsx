import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter, createBrowserRouter, HashRouter, Link, Navigate, Route, RouterProvider, Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)


