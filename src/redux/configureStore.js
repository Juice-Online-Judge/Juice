import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import makeReducers from './reducers'

export default function configureStore({ initialState = {}, browserHistory }) {
  // Compose final middleware and use devtools in debug environment
  const middleware = [thunk, routerMiddleware(browserHistory)]
  const enhancers = []

  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // Create final store and subscribe router in debug env ie. for devtools
  const store = createStore(
    makeReducers(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.asyncReducers = {}

  return store
}
