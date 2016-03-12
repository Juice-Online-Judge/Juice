import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import auth from './modules/auth';

export default combineReducers({
  auth,
  router
});
