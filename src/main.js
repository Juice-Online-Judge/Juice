import 'babel-polyfill'
import 'any-promise/register/pinkie'
import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import useScroll from 'react-router-scroll/lib/useScroll'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, applyRouterMiddleware, browserHistory } from 'react-router'
import routes from './routes'
import configureStore from './redux/configureStore'

const initialState = window.__INITIAL_STATE__
const store = configureStore({ initialState, browserHistory })
const history = syncHistoryWithStore(browserHistory, store)

if (Reflect.has(navigator, 'serviceWorker')) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => {
      console.log('Service worker register succes at scope: ', reg.scope)
    })
}

injectTapEventPlugin()

const Root = (
  <Provider store={ store }>
    <div style={ { height: '100%' } }>
      <Router
        history={ history }
        routes={ routes }
        render={ applyRouterMiddleware(useScroll()) } />
    </div>
  </Provider>
)

// Render the React application to the DOM
ReactDOM.render(
  Root,
  document.getElementById('root')
)
