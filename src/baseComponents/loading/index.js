import Vue from 'vue'
import Loading from './loading.vue'

//实例
let loadingInstance = undefined
//构造器，使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
const LoadingContructor = Vue.extend(Loading)

LoadingContructor.prototype.close = function() {
  setTimeout(() => {
    loadingInstance.loading = false
  })
}

function loading() {
  if (loadingInstance) {
    loadingInstance.loading = true
    return loadingInstance
  }
  loadingInstance = new LoadingContructor({
    el: document.createElement('div'),
    data: {}
  })
  document.body.appendChild(loadingInstance.$el)
  Vue.nextTick(() => {
    loadingInstance.loading = true
  })
  return loadingInstance
}

export default {
  install() {
    Vue.prototype.$loading = loading
  },
  service: loading,
  name: 'Loading'
}
