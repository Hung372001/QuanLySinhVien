import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../stores'

export const sideBarRoutes = [
  {
    name: 'dashboard',
    path: '/dashboard',
    label: 'Tổng quan',
    icon: 'bx bx-home-circle',
    component: () => import('@/views/dashboard/Index.vue')
  },
  {
    path: '/device',
    label: 'Quản lý thiết bị',
    icon: 'bx bxs-devices',
    meta: {
      parent: 'device',
      action: 'read',
    },
    component: () => import('@/views/device/Index.vue'),
    children: [
      {
        name: 'device',
        path: 'list',
        label: 'Thiết bị',
        meta: {
          parent: 'device',
          action: 'read',
        },
        component: () => import('@/views/device/List.vue')
      },
      {
        name: 'import_device',
        path: 'import',
        label: 'Nhập thiết bị',
        meta: {
          parent: 'device',
          action: 'import',
        },
        component: () => import('@/views/device/Import.vue')
      },
      {
        name: 'export_device',
        path: 'export',
        label: 'Xuất thiết bị',
        meta: {
          parent: 'device',
          action: 'export',
        },
        component: () => import('@/views/device/Export.vue')
      },
    ],
  },
  {
    name: 'agency',
    path: '/agency',
    label: 'Đại lý',
    icon: 'bx bx-home',
    meta: {
      parent: 'agency',
      action: 'read',
    },
    component: () => import('@/views/agency/Index.vue'),
    props: (route) => ({ page: route.query.page ? parseInt(route.query.page) : 1 })
  },
  {
    name: 'device_profile',
    path: '/device-profiles',
    label: 'Nhóm thiết bị',
    icon: 'bx bx-grid-alt',
    meta: {
      parent: 'device_profile',
      action: 'read',
    },
    component: () => import('@/views/device_profile/Index.vue')
  },
  {
    name: 'ota_package',
    path: '/ota-packages',
    label: 'OTA Package',
    icon: 'bx bx-extension',
    meta: {
      parent: 'ota_package',
      action: 'read',
    },
    component: () => import('@/views/ota_package/Index.vue')
  },
  {
    name: 'user',
    path: '/users',
    label: 'Khách hàng',
    icon: 'bx bxs-user',
    meta: {
      parent: 'user',
      action: 'read',
    },
    component: () => import('@/views/user/Index.vue')
  },
  {
    name: 'admin',
    path: '/admin',
    label: 'Quản trị viên',
    icon: 'bx bxs-user-pin',
    meta: {
      parent: 'admin',
      action: 'read',
    },
    component: () => import('@/views/admin/Index.vue')
  },
]

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      layout: 'DefaultLayout',
      requiresAuth: true
    },
    redirect: '/device',
    children: [
      ...sideBarRoutes,
      {
        name: 'profile',
        path: '/profile',
        component: () => import('@/views/profile/Index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'AuthLayout',
      requiresAuth: false
    }
  },
  { path: '/:path(.*)', component: () => import('@/views/auth/Login.vue') }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: '',
  linkExactPathActiveClass: '',
  linkExactActiveClass: '',
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})


router.beforeEach(async (to, from, next) => {
  const user = store.getters['auth/getUser']

  if (to.matched.some((record) => record.meta.requiresAuth) && user === null) {
    try {
      await store.dispatch('auth/profile')
      const subUser = store.getters['auth/getUser']
      if (subUser === null) {
        next('/login')
      } else {
        next()
      }
    } catch (error) {
      next('/login')
    }
  } else if (user !== null) {
    switch (to.name) {
      case 'login':
        next({ path: '/' })
        break
      default:
        next()
        break
    }
  } else {
    next()
  }
})



export default router
