import Layout from'@/layout'

export const SafeRouteMap = [
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
        meta: { title: '仪表盘', icon: 'dashboard', affix: true },
        roles: ['admin', 'editor','users']
      }
    ]
  }
]
const PermissionAdmin = () => import('@/views/permission/admin/index')//管理员
const PermissionGroup = () => import('@/views/permission/group/index')//管理组
const Syslog = () => import('@/views/permission/syslog/index')//系统日志


export const PermissionRouteMap = [
	{
    path: '/administrator',
    component: PermissionAdmin,
	},
	{
		path: '/admingroup',
    component: PermissionGroup
	},
	{
		path: '/syslog',
    component: Syslog
  }
]
