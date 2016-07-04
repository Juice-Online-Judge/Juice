import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import app from './modules/app'
import message from './modules/message'
import account from './modules/account'
import validation from './modules/validation'

export const makeReducers = (asyncReducers) => {
  return combineReducers({
    router,
    app,
    message,
    account,
    validation,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeReducers(store.asyncReducers))
}

export default makeReducers
