import 'babel-polyfill'
import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import useScroll from 'react-router-scroll'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, applyRouterMiddleware, useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import routes from './routes'
import configureStore from './redux/configureStore'

const historyConfig = { basename: __BASENAME__ }
const browserHistory = useRouterHistory(createHistory)(historyConfig)

const initialState = window.__INITIAL_STATE__
const store = configureStore({ initialState, browserHistory })
const history = syncHistoryWithStore(browserHistory, store)

injectTapEventPlugin()

if (__PROD__) {
  require('offline-plugin/runtime').install()
}

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
