import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import Login from '@/pages/Login'

// import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/',
    component: Login
  },
  {
    name: 'home',
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//     const json = localStorage.getItem(userKey)

//     if(to.matched.some(record => record.meta.requiresAdmin)){
//         const user = JSON.parse(json)
//         user && user.admin ? next() : next({ path: '/' })
//     } else {
//         next()
//     }
// })

export default router
