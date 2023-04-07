import Vue from 'vue'
import VueRouter from 'vue-router'

import portalLayout from '../layout/portalLayout.vue'
// import companyLayout from '../layout/cmpnyLayout.vue'
// import userLayout from '../layout/userLayout.vue'
import authLayout from '../layout/authlayout.vue'



Vue.use(VueRouter)

const routes = [


  //ADMIN ROUTES

  {
    path: "/bgchecker",
    // redirect: '/home',
    component: portalLayout,

    children: [
      {
        path: '/',
        name: 'BackgroundChecker',
        component: () => import('../views/bgchecker.vue')
      },

      {
        path: 'shield',
        name: 'shield',
        component: () => import('../views/shield.vue')
      },
      {
        path: 'plagarism',
        name: 'plagarism',
        component: () => import('../views/plagarism.vue')
      },


    ],
  },

  {
    path: "/",
    // redirect: '/bgc',
    component: authLayout,
    meta: {
      requiresAuth: true,
      isAdmin: true
    },
    children: [
      {
        path: '/',
        name: 'studentHome',
        component: () => import('../views/auth/login.vue')
      },
      // {
      //   path: '/bgchecker',
      //   name: 'BackgroundChecker',
      //   component: () => import('../views/bgchecker.vue')
      // }




    ],
  },

  // {
  //   path: "/login",
  //   component: authLayout,
  //   children: [
  //     {
  //       path: '/auth',
  //       name: 'login',
  //       component: () => import('../views/auth/login.vue')
  //     },
  //   ],
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
