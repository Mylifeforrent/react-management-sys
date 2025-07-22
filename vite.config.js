import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // 插件配置，React 项目必备
  plugins: [react()],

  // 路径别名配置，@ 可代表 src 目录，方便导入
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // 开发服务器相关配置
  server: {
    host: '127.0.0.1',
    port: 5173, // 本地开发端口
    open: true, // 启动后自动打开浏览器
    proxy: {
      // 代理 API 请求，解决本地开发跨域问题
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },

  // 构建相关配置
  build: {
    outDir: 'dist', // 构建输出目录
    sourcemap: true, // 生成 source map 便于调试
  },

  // 环境变量前缀，只有以 VITE_ 开头的变量会被注入
  envPrefix: 'VITE_',
})
