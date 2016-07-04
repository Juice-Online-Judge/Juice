import isFunction from 'lodash/isFunction'

export default (store, routeOrFactory) => {
  if (isFunction(routeOrFactory)) {
    return routeOrFactory(store)
  }
  return routeOrFactory
}
