/**
 * api接口的统一出口
 */
// 自动扫描 modules 里面的 api 模块,请根据业务自行拆分
const files = require.context('./modules', false, /\.js$/)
const list = files.keys().map(key => {
  return files(key).default
})
const apiModules = {}
list.map(item => {
  apiModules[item.apiName] = item.apiList
})
//  导出接口
export default apiModules
