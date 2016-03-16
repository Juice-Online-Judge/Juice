import { applyMiddleware, compose, createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

function withDevTools(middleware) {
  const devTools = window.devToolsExtension
    ? window.devToolsExtension()
    : require('containers/DevTools').default.instrument();
  return compose(middleware, devTools);
}

export default function configureStore({ initialState = {}, browserHistory }) {
  // Compose final middleware and use devtools in debug environment
  let middleware = applyMiddleware(thunk);
  if (__DEBUG__) middleware = withDevTools(middleware);

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState);
  const history = syncHistoryWithStore(browserHistory, store);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;

      store.replaceReducer(nextRootReducer);
    });
  }
  return { store, history };
}
