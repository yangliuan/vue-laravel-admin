import {constantRoutes,otherRouter } from '@/router'
import store from '..'
import user from './user'
import Layout from '@/layout'



/**
 * 获取一个路由组件
 * @param {*} node  节点信息
 */
function getRouter(node, component, isRoot = false) {

  let temp = {
    path: isRoot ? node.gui_behavior : node.gui_behavior.replace('/', ''),
      component: component,
      name: node.name,
      meta: { title: node.name, icon: ''},
      hidden: (node.gui_type > 2)
  }

  if(isRoot && node.children) {
    temp.children = []
  }

  // isRoot && (temp.children = [])
  // isRoot && (temp.alwaysShow = true)
  return temp
}


function findComponentByPath(url) {
  let router = asyncRoutes.find(route => {
    if (route.path == url) {
        return true
    }
})
  return router ? router.component : null
}

export function filterAsyncRoutes(menus, isRoot = true) {
  const routers = []
  let component
  menus.forEach(menu => {
      let route = Object.assign({})
      try {
          if (isRoot) {
              route = getRouter(menu, Layout, true)
          }
          else if (menu.children && menu.children.length > 0) {
              let result = menu.children.find((item) => {
                component = findComponentByPath(item.gui_behavior)
                  return component
              })
              if (result) {
                  route = getRouter(result, component, true)
              } else {
                  return
              }
          }
          else {
            if (!menu.gui_behavior) { return }
              component = findComponentByPath(menu.gui_behavior)
              if (!component) { return }
              route = getRouter(menu, component)
          }
          if (menu.children && menu.children.length > 0 && isRoot) {
              route.children = route.children.concat(filterAsyncRoutes(menu.children, false))
          }
      } catch (error) { console.log(error); return }

      routers.push(route)
  })
  return routers
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

function filterNotFoundRouter(menus) {

  let routers = filterAsyncRoutes(menus)

  let newRouters = []
  routers.forEach(route => {
      try {
          if (route.children.length > 0) {
              route.redirect = route.children[0].path
              newRouters = newRouters.concat(route)
          }
      } catch (err) { console.log(err) }

      return route
  })

  return newRouters
}

function getOwnRoutes(menus) {
  let routers = filterNotFoundRouter(menus)
  routers = routers.concat(otherRouter)
  return routers
}

//设置系统菜单和路由
const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      const { menu } = user.state
      console.log('menu',menu)
      let accessedRoutes = getOwnRoutes(menu)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
  })
    return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        console.log(accessedRoutes)

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
