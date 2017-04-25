import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore ({initialState = {}, browserHistory}) {
  const middleware = applyMiddleware(thunk, routerMiddleware(browserHistory))
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(middleware)
  )

  return store
}
