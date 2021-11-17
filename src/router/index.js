import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * errorRoutes
 */

export const errorRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    name: 'permission',
    meta: { title: '权限管理', icon: 'lock' },
    children: [
      {
        path: 'admingroup',
        name: 'AdminGroup',
        component: () => import('@/views/permission/group/index'),
        meta: { title: '管理组' }
      },
      {
        path: 'admingroup/create',
        name: 'CreateAdminGroup',
        component: () => import('@/views/permission/group/create'),
        meta: { title: '添加管理组' },
        hidden: true
      },
      {
        path: 'admingroup/edit/:id(\\d+)',
        name: 'EditAdminGroup',
        component: () => import('@/views/permission/group/edit'),
        meta: { title: '编辑管理组' },
        hidden: true
      },
      {
        path: 'admingroup/rules/:id(\\d+)',
        name: 'SetAdminGroupRules',
        component: () => import('@/views/permission/group/rules'),
        meta: { title: '权限设置' },
        hidden: true
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/permission/admin/index'),
        meta: { title: '管理员' }
      },
      {
        path: 'admin/create',
        name: 'CreateAdmin',
        component: () => import('@/views/permission/admin/create'),
        meta: { title: '添加管理员' },
        hidden: true
      },
      {
        path: 'admin/edit/:id(\\d+)',
        name: 'EditAdmin',
        component: () => import('@/views/permission/admin/edit'),
        meta: { title: '编辑管理员' },
        hidden: true
      },
      {
        path: 'syslog',
        name: 'Syslog',
        component: () => import('@/views/permission/syslog/index'),
        meta: { title: '系统日志' }
      },
      {
        path: 'adminrules',
        name: 'AdminRules',
        component: () => import('@/views/permission/rules/index'),
        meta: { title: '权限规则' }
      },
      {
        path: 'adminrules/create',
        name: 'CreateAdminRules',
        component: () => import('@/views/permission/rules/create'),
        meta: { title: '添加权限规则' },
        hidden: true
      },
      {
        path: 'adminrules/edit/:id(\\d+)',
        name: 'EditAdminRules',
        component: () => import('@/views/permission/rules/edit'),
        meta: { title: '编辑权限规则' },
        hidden: true
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
