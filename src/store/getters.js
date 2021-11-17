const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  menu: state => state.user.menu,
  permisson_menu_level: state => state.user.permisson_menu_level,
  name: state => state.user.name,
  permission_routes: state => state.permission.routes
}
export default getters
