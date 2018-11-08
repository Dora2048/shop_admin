// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// 引入element-ui组件库
import ElementUI from 'element-ui'
// 引入组件库的样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式
import '@/css/common.css'

// 使用ElementUI插件
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
