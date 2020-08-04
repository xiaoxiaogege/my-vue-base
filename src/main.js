import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import api from './api'
console.log('api====', api)
Vue.prototype.$api = api

Vue.config.productionTip = false

// 安装基础组件 与自定义组件
import BaseComponent from './baseComponents'
Vue.use(BaseComponent, {})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
