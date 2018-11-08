import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})

export default router
// 路由守卫
router.beforeEach(
  (to, form, next) => {
    // console.log(to, form, next)
    const token = localStorage.getItem('token')
    // 如果有token
    if (token || to.path === '/login') {
      next()
    } else {
      this.$router.push('/login')
      // next('/login')
    }
  }
)
