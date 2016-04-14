import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from './modules/app';
import account from './modules/account';
import question from './modules/question';
import submission from './modules/submission';
import validate from './modules/validate';

export default combineReducers({
  app,
  account,
  question,
  submission,
  validate,
  routing
});
