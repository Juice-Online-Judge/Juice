import 'any-promise/register/pinkie'
import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import browserHistory from 'lib/history'
import Routes from './routes'
import configureStore from './redux/configureStore'

const initialState = window.__INITIAL_STATE__
const store = configureStore({ initialState, browserHistory })

if (Reflect.has(navigator, 'serviceWorker')) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
      registration.unregister()
    }
  })
}

const Root = (
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <ConnectedRouter history={browserHistory}>
        <Routes />
      </ConnectedRouter>
    </div>
  </Provider>
)

// Render the React application to the DOM
ReactDOM.render(Root, document.getElementById('root'))
