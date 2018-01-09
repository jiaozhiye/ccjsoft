import Vue from 'vue'
import Common from 'common/js/common'
import 'common/js/tool'
import ViewApp from './View.vue'
import store from './store'
import axios from 'axios'

// 在 Vue 原型上挂载 $http 方法
Vue.prototype.$http = axios.create({
  baseURL: window.serverUrl,
  timeout: 3000
})

new Vue({
  el: '#app',
  store,
  render: h => h(ViewApp)
})
