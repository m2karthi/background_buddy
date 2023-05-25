import Vue from 'vue'
import VueRouter from 'vue-router'

import portalLayout from '../layout/portalLayout.vue'
import companyLayout from '../layout/cmpnyLayout.vue'
// import userLayout from '../layout/userLayout.vue'
import authLayout from '../layout/authlayout.vue'



Vue.use(VueRouter)

const routes = [


  //ADMIN ROUTES

  {
    path: "/admin",
    redirect: '/admin/faculties',
    component: portalLayout,

    children: [
      // {
      //   path: '/',
      //   name: 'BackgroundChecker',
      //   component: () => import('../views/bgchecker.vue')
      // },

      {
        path: 'exam',
        name: 'exam',
        component: () => import('../views/admin/exam.vue')
      },
      {
        path: 'faculties',
        name: 'faculties',
        component: () => import('../views/admin/faculties.vue')
      },
      {
        path: 'scheduler',
        name: 'scheduler',
        component: () => import('../views/admin/scheduler.vue')
      },
      
      {
        path: 'settings',
        name: 'faculties',
        component: () => import('../views/admin/settings.vue')
      },
     

   


    ],
  },

  {
    path: "/faculty",
    redirect: '/faculty/schedules',
    component: companyLayout,

    children: [
      {
        path: 'schedules',
        name: 'facultyhome',
        component: () => import('../views/faculty/schedules.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/faculty/profile.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../views/faculty/settings.vue')
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
        name: 'singin',
        component: () => import('../views/auth/login.vue')
      },
      {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: () => import('../views/auth/forgotPassword.vue')
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
