/**
 * TypeScript 全局类型声明文件
 * 
 * 这个文件用于扩展第三方库的类型定义，为项目提供更好的类型支持。
 * TypeScript 会自动识别 .d.ts 文件并应用其中的类型声明。
 * 
 * 主要用途：
 * 1. 扩展第三方库的接口定义
 * 2. 声明全局变量和类型
 * 3. 为没有类型定义的模块提供类型支持
 * 4. 自定义模块声明
 */

import axios from 'axios'

/**
 * 扩展 Axios 请求配置接口
 * 
 * 通过 declare module 语法扩展 axios 模块的 AxiosRequestConfig 接口，
 * 添加自定义的配置选项，用于控制请求的行为。
 * 
 * 扩展的配置项：
 * - showLoading: 是否显示加载状态
 * - showError: 是否显示错误提示
 * 
 * 使用示例：
 * ```typescript
 * // 在请求中使用自定义配置
 * axios.get('/api/users', {
 *   showLoading: true,    // 显示加载动画
 *   showError: false      // 不显示错误提示
 * });
 * 
 * // 在请求拦截器中访问这些配置
 * axios.interceptors.request.use(config => {
 *   if (config.showLoading) {
 *     showLoading(); // 显示加载状态
 *   }
 *   return config;
 * });
 * 
 * // 在响应拦截器中处理错误显示
 * axios.interceptors.response.use(
 *   response => response,
 *   error => {
 *     if (error.config.showError !== false) {
 *       message.error(error.message); // 显示错误信息
 *     }
 *     return Promise.reject(error);
 *   }
 * );
 * ```
 * 
 * 实际应用场景：
 * 1. 某些请求需要显示加载状态，某些不需要
 * 2. 某些错误需要静默处理，不显示给用户
 * 3. 批量请求时只在最后一个请求完成时隐藏加载状态
 */
declare module 'axios' {
  interface AxiosRequestConfig {
    /**
     * 是否显示加载状态
     * @default true
     * @example
     * // 显示加载动画
     * axios.get('/api/data', { showLoading: true })
     * 
     * // 不显示加载动画（静默请求）
     * axios.get('/api/heartbeat', { showLoading: false })
     */
    showLoading?: boolean
    
    /**
     * 是否显示错误提示
     * @default true
     * @example
     * // 显示错误提示
     * axios.post('/api/login', data, { showError: true })
     * 
     * // 不显示错误提示（自定义错误处理）
     * axios.get('/api/check', { showError: false })
     *   .catch(error => {
     *     // 自定义错误处理逻辑
     *     console.log('检查失败，但不显示给用户');
     *   })
     */
    showError?: boolean
  }
}

/**
 * 其他可能的类型声明示例：
 * 
 * // 声明全局变量
 * declare global {
 *   interface Window {
 *     __REDUX_DEVTOOLS_EXTENSION__?: any;
 *   }
 * }
 * 
 * // 声明模块
 * declare module '*.module.less' {
 *   const classes: { [key: string]: string };
 *   export default classes;
 * }
 * 
 * // 声明环境变量类型
 * declare namespace NodeJS {
 *   interface ProcessEnv {
 *     VITE_APP_BASE_URL: string;
 *     VITE_APP_MOCK: string;
 *   }
 * }
 */
