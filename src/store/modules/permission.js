import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 根据指定属性的值，过滤数组对象
 * @param arr_obj 数组对象
 * @param name 要匹配的属性值
 */
function filterArrObj(arr_obj, name) {
  for (const item of arr_obj) {
    if (item.gui_behavior === name) return item
    if (item.children && item.children.length) {
      const _item = filterArrObj(item.children, name)
      if (_item) return _item
    }
  }
}

/**
 * 替换对象属性
 * @param {*} route
 * @param {*} rule
 * @returns
 */
function replaceRouteProperty(route, rule) {
  if (rule.title) {
    route.meta.title = rule.title
  }

  if (rule.icon) {
    route.meta.icon = rule.icon
  }

  return route
}

/**
 * 根据权限menu过滤异步路由
 * @param routes asyncRoutes
 * @param menu 接口返回的权限菜单
 * @param permisson_menu_level 权限菜单等级，2表示只验证到2级，3表示验证到3级
 */
export function filterAsyncRoutes(routes, menu, permisson_menu_level) {
  const res = []

  routes.forEach(route => {
    let tmp = { ...route }
    // 根据路由name 匹配 接口menu的gui_behavior
    const rule = filterArrObj(menu, tmp.name)

    if (rule) {
      // 如果存在子菜单
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menu, permisson_menu_level)
      }

      tmp = replaceRouteProperty(tmp, rule)
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, permission_menu) {
    return new Promise(resolve => {
      let accessedRoutes
      if (permission_menu.menu.length > 0) {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, permission_menu.menu, permission_menu.permisson_menu_level)
      } else {
        accessedRoutes = []
      }
      // 前端开发模式展示本地所有路由
      // accessedRoutes = asyncRoutes
      console.log(JSON.stringify(accessedRoutes, null, 4))
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
