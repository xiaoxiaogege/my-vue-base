import base from '../base' //导入接口域名列表
import axios from '../http' //导入http中创建的axios实例
/**
 * 模块所属：例如：base.hmallAPI
 * 明确api作用以及所属模块P
 * 方法以api为名，例如“/goods/getGoodses” 以 “getGoodses” 为方法调用名
 * 明确参数类型
 *  axios.request(config)
    axios.get(url[, config])
    axios.delete(url[, config])
    axios.head(url[, config])
    axios.post(url[, data[, config]])
    axios.put(url[, data[, config]])
    axios.patch(url[, data[, config]])
    config 具体配置参见axios文档，可覆盖全局配置
 */

const domeBase = base.hmallAPI

const apiList = {
  //接口方法....
  // 例如下
  dome(data) {
    return axios.post(`${domeBase}/dome/dome`, data, {})
  },
  dome2(params) {
    return axios.get(`${domeBase}/dome/dome`, { params })
  }
}

//导出模块
export default {
  apiName: 'dome',
  apiList
}
