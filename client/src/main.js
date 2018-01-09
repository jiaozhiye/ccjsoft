import Vue from 'vue'
import Common from 'common/js/common'
import 'common/js/tool'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import routes from './routes'
import axios from 'axios'
import qs from 'qs'

// Vue.use(VueRouter)

// const router = new VueRouter(routes)

// 在 Vue 原型上挂载 $http 方法
Vue.prototype.$http = axios.create({
  baseURL: window.serverUrl,
  timeout: 3000,
  paramsSerializer: function(params){
    // 序列化 get 请求参数 -> a: [1, 2] => a=1&a=2
    return qs.stringify(params, {arrayFormat: 'repeat'})
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

new Vue({
  el: '#app',
  // router,
  store,
  render: h => h(App)
})
