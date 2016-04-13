import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import account from './modules/account';
import question from './modules/question';
import submission from './modules/submission';
import validate from './modules/validate';

export default combineReducers({
  account,
  question,
  submission,
  validate,
  routing
});
