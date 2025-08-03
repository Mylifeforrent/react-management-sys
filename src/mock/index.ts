// Mock模块入口文件
// 统一导出Mock相关的功能，方便其他模块使用

export { axiosRequestMockHandler, MOCK_CONFIG } from './axios-mock'
export { loginMockData, userMockData } from './data'

/**
 * 新版Mock模块使用说明：
 *
 * 1. 开启/关闭Mock功能：
 *    - 修改 axios-mock.ts 中的 MOCK_CONFIG.enabled
 *    - 或在浏览器控制台中调用 window.toggleAxiosMock()
 *
 * 2. 添加新的Mock数据：
 *    - 在 data.ts 中添加新的Mock数据
 *    - 在 axios-mock.ts 的 mockRoutes 中添加对应的路由
 *
 * 3. 完全无侵入性：
 *    - API代码无需任何修改
 *    - Mock功能在axios拦截器层面自动处理
 *    - 完整模拟HTTP请求链路
 *
 * 4. Mock数据格式：
 *    - 建议保持与真实API相同的数据结构
 *    - 包含 code、message、data 字段
 *
 * 5. 调试功能：
 *    - 控制台会显示 🎭 axios Mock拦截 和 🎭 axios Mock响应 日志
 *    - 可以通过 window.AXIOS_MOCK_CONFIG 查看当前配置
 */
