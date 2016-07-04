import computedRoute from './computedRoute'

export default (store, routes) => {
  return routes.map((route) => {
    return computedRoute(store, route)
  })
}
