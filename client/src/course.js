import Vue from 'vue'
import Common from 'common/js/common'
import 'common/js/tool'
import CourseApp from './Course.vue'
import store from './store'
import VueRouter from 'vue-router'
import routes from './routes'
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
  render: h => h(CourseApp)
})
