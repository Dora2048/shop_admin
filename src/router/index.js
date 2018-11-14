import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import User from '@/components/users/User.vue'
import Role from '@/components/rights/Role.vue'
import Right from '@/components/rights/Right.vue'
import Goods from '@/components/goods/Goods.vue'
import GoodCategory from '@/components/goods/GoodCategory.vue'
import Orders from '@/components/orders/Orders.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [{
          path: '/users',
          component: User
        },
        {
          path: '/roles',
          component: Role
        },
        {
          path: '/rights',
          component: Right
        },
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/categories',
          component: GoodCategory
        },
        {
          path: '/orders',
          component: Orders
        }
      ]
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
      // this.$router.push('/login')
      next('/login')
    }
  }
)
