import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';
import api from 'lib/api';

const initialState = Immutable.fromJS({
  list: []
});
