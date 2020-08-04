// 扫描所有的组件
const files = require.context('./', true, /^\.\/[\w-_]+\/index\.(js|vue)$/)

const components = files.keys().map(key => {
  return files(key).default
})
console.log('扫描所有的组件', components)

export default {
  install(Vue) {
    components.forEach(item => {
      Vue.use(item, {})
      if (item.name) {
        Vue.component(item.name, item.service)
      }
    })
  }
}
