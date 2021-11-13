import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function findMenu(menu, route_path) {
  for (const item of menu) {
    if (item.gui_behavior === route_path) return item
    if (item.children && item.children.length) {
      const _item = filterTableMater(route_path, item.children)
      if (_item) return _item
    }
  }
  return false
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, menu) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    let rule = findMenu(menu, tmp.path)
    //console.log(rule)
    if (rule || tmp.children) {
      if (tmp.children) {
        //tmp.children = filterAsyncRoutes(tmp.children, menu)
      }
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
      let test = filterAsyncRoutes(asyncRoutes, menu)
      console.log(test)
      accessedRoutes = asyncRoutes
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
