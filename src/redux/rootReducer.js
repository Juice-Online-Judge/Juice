import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './modules/auth';

export default combineReducers({
  auth,
  routing
});
