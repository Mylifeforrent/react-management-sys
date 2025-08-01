/**
 * 环境配置，运行时环境配置
 */
type ENV = 'dev' | 'stg' | 'prd';

// let env:ENV = 'dev'
// if (location.host === 'localhost:8080') {
//   env = 'dev'
// } else if (location.host==='driver-stg.cc') {
//   env = 'stg'
// } else {
//   env = 'prd'
// }

const env = (document.documentElement.dataset.env as ENV) || 'stg'

const config = {
  dev: {
    baseApi: '/api',
    uploadApi: true,
    mock:true,
    mockApi: 'xxx',
    cdn:"http://xxx.aliyun.com"
  },
  stg: {
    baseApi: '/api',
    uploadApi: true,
    mock:false,
    mockApi: 'xxx',
    cdn:"http://xxx.aliyun.com"
  },
  prd: {
    baseApi: '/api',
    uploadApi: true,
    mock:false,
    mockApi: 'xxx',
    cdn:"http://xxx.aliyun.com"
  },
};

export default {
  env,
  ...config[env],//动态根据你的环境变量引入对应的环境配置，这就是运行时环境变量
}
