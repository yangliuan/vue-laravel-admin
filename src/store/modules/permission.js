import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 根据指定属性的值，过滤数组对象
 * @param arr_obj
 * @param route
 */
function filterArrObj(arr_obj, path) {
  for (const item of arr_obj) {
    if (item.gui_behavior === path) return item
    if (item.children && item.children.length) {
      const _item = filterArrObj(item.children, path)
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
 * @param roles
 */
export function filterAsyncRoutes(routes, menu) {
  const res = []
  routes.forEach(route => {
    let tmp = { ...route }
    const rule = filterArrObj(menu, tmp.path)
    if (rule || tmp.children) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menu)
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
  generateRoutes({ commit }, menu) {
    return new Promise(resolve => {
      let accessedRoutes
      if (menu.length > 0) {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, menu)
      } else {
        accessedRoutes = []
      }
      // 前端开发模式展示本地所有路由
      // accessedRoutes = asyncRoutes
      // console.log(JSON.stringify(accessedRoutes,null,4))
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
