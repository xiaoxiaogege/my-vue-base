import axios from './http' //导入http中创建的axios实例

//导出模块
export const queryList = params => {
  return axios.get('/list', {
    params
  })
}

export const restfulList = params => {
  return axios.get('/restful/1/list', {
    params
  })
}

