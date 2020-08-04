import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const files = require.context('./modules', false, /\.js$/)
let routes = files.keys().map(key => {
  return files(key).default
})

routes = routes.flat()

console.log('router', routes)

console.log('process.env.BASE_URL', process.env.BASE_URL)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
