import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from './modules/app';
import message from './modules/message';
import account from './modules/account';
import question from './modules/question';
import submission from './modules/submission';
import submissionFilter from './modules/submissionFilter';
import validate from './modules/validate';
import exam from './modules/exam';
import users from './modules/users';
import role from './modules/role';

export default combineReducers({
  app,
  message,
  account,
  question,
  submission,
  submissionFilter,
  exam,
  users,
  role,
  validate,
  routing
});
