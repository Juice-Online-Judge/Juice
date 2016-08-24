import Promise from 'bluebird'
import pathToRegexp from 'path-to-regexp'
import { networkOnly } from './strategy'

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
    const routes = this.routes.get(regex) || { keys, handlers: [] }
    routes.handlers.push({ handler, method })
    this.routes.set(regex, routes)
  }

  dispatch(method, path) {
    const { routes } = this

    for (const regex of routes.keys()) {
      let m = path.match(regex)
      if (m) {
        const { keys, handlers } = routes.get(regex)
        const request = {
          path,
          params: {}
        }

        keys.forEach((key, idx) => {
          request.params[key.name] = m[idx + 1]
        })

        return handlers.reduce((res, route) => {
          if (!route.method || route.method === method) {
            return res
              .then((value) => route.handler(request, value))
          } else {
            return res
          }
        }, Promise.resolve())
          .then((response) => isResponse(response)
            ? response
            : networkOnly()
          )
      }
    }

    return networkOnly()
  }
}

[
  'get',
  'post',
  'put',
  'delete'
].forEach((method) => {
  Router.prototype[method] = function(path, handler) {
    this.addRoute(method, path, handler)
  }
})

function isResponse(response) {
  return response && response instanceof Response
}

export default Router
