'use strict'
import axios from 'axios'
import router from '@/router'
// import { Message } from "element-ui";

/**弹窗提示 */
const tip = msg => {
  console.log(msg)
  // Message({
  //   message: msg,
  //   duration: 1000,
  //   forbidClick: true,
  // });
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param {String} other  请求失败的message
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，或者登录过去，跳转登录页
    case 401:
      tip('登录过期，请重新登录')
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('没有权限访问，请联系管理员')
      localStorage.removeItem('token')
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    case 500:
      tip('服务器错误！')
      break
    case 503:
      tip('服务器暂时无法处理请求')
      break
    default:
      console.log(other)
  }
}

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 60
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] =
  'application/json;charset=UTF-8'
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */

instance.interceptors.request.use(
  config => {
    // loading
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = localStorage.BearerToken
    token && (config.headers.Authorization = 'Bearer ' + token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  // response=>{
  //     return response
  // }
  response =>
    response.status === 200
      ? Promise.resolve(response)
      : Promise.reject(response),
  //请求成功
  //console.log('response',response)
  //return response
  error => {
    // console.log('error',error)
    // console.log('error response',error.response)
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况,这里简单提示网络错误
      // Message({
      //   message: '网络错误,请检测网络',
      //   type: 'error'
      // })
      console.log('网络错误,请检测网络')
    }
  }
)

export default instance
