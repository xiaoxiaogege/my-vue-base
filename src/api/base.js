// 一些全局的config配置
const modeUrlObj = {
  // 生产环境
  production: {
    baseURL: {
      authAPI: '/authority',
      reqAPI: '/requirement',
      proAPI: '/product',
      ordAPI: '/order',
      hmallAPI: '/hmall'
    }
  },
  // 开发环境
  development: {
    baseURL: {
      authAPI: 'http://dev.com/authority',
      reqAPI: 'http://dev.com/requirement',
      proAPI: 'http://dev.com/product',
      ordAPI: 'http://dev.com/order',
      hmallAPI: 'http://dev.com/hmall'
    }
  },
  // 测试环境
  test: {
    baseURL: {
      authAPI: 'http://test.com/authority',
      reqAPI: 'http://test.com/requirement',
      proAPI: 'http://test.com/product',
      ordAPI: 'http://test.com/order',
      hmallAPI: 'http://test.com/hmall'
    }
  }
}
export default modeUrlObj[process.env.NODE_ENV]
