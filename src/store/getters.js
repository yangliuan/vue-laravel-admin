const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  menu: state => state.user.menu,
  name: state => state.user.name,
  permission_routes: state => state.permission.routes
}
export default getters
