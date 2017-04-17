import Promise from 'any-promise'
import pathToRegexp from 'path-to-regexp'
import {networkOnly} from './strategy'

class Router {
  constructor(basePath = '') {
    this.basePath = basePath
    this.routes = new Map()
  }

  all(path, handler) {
    this.addRoute(null, path, handler)
  }

  addRoute(method, path, handler) {
    const keys = []
    const regex = pathToRegexp(path, keys)
    const routes = this.routes.get(regex) || {keys, handlers: []}
    routes.handlers.push({handler, method})
    this.routes.set(regex, routes)
  }

  dispatch(request) {
    const {routes} = this
    const path = request.url
    const method = request.method

    for (const regex of routes.keys()) {
      const m = path.match(regex)

      if (!m) {
        continue
      }

      const {keys, handlers} = routes.get(regex)
      const request = {
        path,
        params: {}
      }

      keys.forEach((key, idx) => {
        request.params[key.name] = m[idx + 1]
      })

      return handlers
        .reduce((res, route) => {
          if (!route.method || route.method === method) {
            return res.then(value => route.handler(request, value))
          } else {
            return res
          }
        }, Promise.resolve())
        .then(
          response => (isResponse(response) ? response : networkOnly(request))
        )
    }

    return networkOnly(request)
  }
}

;['get', 'post', 'put', 'delete'].forEach(method => {
  Router.prototype[method] = function(path, handler) {
    this.addRoute(method, path, handler)
  }
})

function isResponse(response) {
  return response && response instanceof Response
}

export default Router
