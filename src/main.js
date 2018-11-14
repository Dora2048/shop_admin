// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui组件库
import ElementUI from 'element-ui'
// 引入组件库的样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式
import '@/css/common.css'
// 引入axios，
import axios from 'axios'
// 引入第三方插件 element-tree-grid
import ElTreeGrid from 'element-tree-grid'
// 创建element-tree-grid全局组件
Vue.component(ElTreeGrid.name, ElTreeGrid)
// 将axios添加到vue原型上，方便使用
Vue.prototype.axios = axios
// 使用ElementUI插件
Vue.use(ElementUI)
Vue.config.productionTip = false
// 将接口基准地址配置为全局默认值
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 通过axios的拦截器，设置请求头
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (res) {
    // 对响应数据做点什么
    return res.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
