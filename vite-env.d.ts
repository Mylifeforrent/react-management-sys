/// <reference types="vite/client" />

/**
 * Vite 环境变量类型声明
 * 扩展 ImportMetaEnv 接口，添加项目中使用的环境变量
 */
interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
  readonly NODE_ENV: 'development' | 'production' | 'test'
  // 可以在这里添加更多环境变量的类型声明
  // readonly VITE_APP_API_KEY: string
  // readonly VITE_APP_TITLE: string
}

/**
 * 扩展 ImportMeta 接口
 * 确保 import.meta.env 有正确的类型支持
 */
interface ImportMeta {
  readonly env: ImportMetaEnv
}
