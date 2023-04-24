import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: 'goods',  // 设置重定向，首页重定向到商品列表
    children: [
      {
        path: "goods",
        name: "goods",
        meta: {
          isShow: true,
          title: "商品列表"
        },
        component: () => import(/* webpackChunkName: "goods" */ '../views/GoodsView.vue')
      },
      {
        path: "user",
        name: "user",
        meta: {
          isShow: true,
          title: "用户列表"
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue')
      },
      {
        path: "role",
        name: "role",
        meta: {
          isShow: true,
          title: "角色列表"
        },
        component: () => import(/* webpackChunkName: "role" */ '../views/RoleView.vue')
      },
      {
        path: "authority",
        name: "authority",
        meta: {
          isShow: false,  // 作为角色列表中修改权限进行跳转，不在菜单中显示
          title: "权限列表"
        },
        component: () => import(/* webpackChunkName: "authority" */ '../views/AuthorityView.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem('token')
  if(!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
