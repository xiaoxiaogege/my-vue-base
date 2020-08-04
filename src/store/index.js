import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//读取 modules 下的所有模块，并载入到modules
const files = require.context('./modules', false, /\.js$/)
const list = files.keys().map(key => {
  return files(key).default
})
const modules = {}
list.map(item => {
  modules[item.name] = item.value
})
console.log('store modules', modules)
//  导出
export default new Vuex.Store({
  //不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
  strict: process.env.NODE_ENV !== 'production', //状态变更且不是由 mutation 函数引起的，将会抛出错误。
  state: {},
  mutations: {},
  actions: {},
  modules: modules
})
