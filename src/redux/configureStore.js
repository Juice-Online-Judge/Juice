import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore ({initialState = {}, browserHistory}) {
  let middleware = applyMiddleware(thunk, routerMiddleware(browserHistory))
  const {devToolsExtension} = window

  if (typeof devToolsExtension === 'function') {
    middleware = compose(middleware, window.devToolsExtension())
  }

  const store = createStore(rootReducer, initialState, middleware)

  return store
}
