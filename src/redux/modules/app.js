import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';

import { RequestStatus } from 'lib/const';
import { clearExam } from './exam';
import { clearQuestion } from './question';
import { clearSubmissions } from './submission';
import { clearUsers } from './users';

const AppStatus = new Immutable.Record({
  status: RequestStatus.NONE,
  error: null
});

const initialState = new AppStatus();

const SET_STATUS = 'SET_STATUS';
const SET_ERROR = 'SET_ERROR';
const CLEAR_STATUS = 'CLEAR_STATUS';
const CLEAR_ERROR = 'CLEAR_ERROR';

export const setStatus = createAction(SET_STATUS);
export const setError = createAction(SET_ERROR);
export const clearStatus = createAction(CLEAR_STATUS);
export const clearError = createAction(CLEAR_ERROR);
export const clearCache = () => (dispatch) => {
  dispatch(clearExam());
  dispatch(clearQuestion());
  dispatch(clearSubmissions());
  dispatch(clearUsers());
};
export const actions = {
  setStatus,
  setError,
  clearStatus,
  clearError,
  clearCache
};

export default handleActions({
  [SET_STATUS]: (state, { payload }) => state.set('status', payload),
  [CLEAR_STATUS]: (state) => state.set('status', RequestStatus.NONE),
  [SET_ERROR]: (state, { payload }) => state.set('error', Immutable.fromJS(payload)),
  [CLEAR_ERROR]: (state, { payload }) => state.set('error', null).set('status', RequestStatus.NONE)
}, initialState);
