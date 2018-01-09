import Vue from 'vue'
import Common from 'common/js/common'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from 'store'
import axios from 'axios'

Vue.use(VueRouter)
const router = new VueRouter(routes)

// 在 Vue 原型上挂载 $http 方法
Vue.prototype.$http = axios.create({
  baseURL: window.serverUrl,
  timeout: 3000
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
