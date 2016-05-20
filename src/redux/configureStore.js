import { applyMiddleware, compose, createStore } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';

export default function configureStore({ initialState = {}, browserHistory, rootSaga }) {
  // Compose final middleware and use devtools in debug environment
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory));
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, window.devToolsExtension());
    }
  }

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState);
  const history = syncHistoryWithStore(browserHistory, store);
  sagaMiddleware.run(rootSaga);

  return { store, history };
}
