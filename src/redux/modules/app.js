import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { fromJS, Record } from 'immutable';

import { RequestStatus } from 'lib/const';
import { clearExam } from './exam';
import { clearQuestion } from './question';
import { clearSubmissions } from './submission';
import { clearUsers } from './users';

export const AppStatus = new Record({
  status: RequestStatus.NONE,
  error: null
});

export const initialState = new AppStatus();

export const SET_STATUS = 'SET_STATUS';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_STATUS = 'CLEAR_STATUS';
export const CLEAR_ERROR = 'CLEAR_ERROR';

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

export const appStatusSelector = (state) => state.app.get('status');
const appErrorSelector = (state) => state.app.getIn(['error', 'messages']);

export const isPendingSelector = createSelector(
  [appStatusSelector],
  (status) => status === RequestStatus.PENDING
);

export const createIsErrorSelector = () => createSelector(
  [appStatusSelector],
  (status) => status === RequestStatus.FAIL
);

export const createErrorSelector = () => createSelector(
  [createIsErrorSelector(), appErrorSelector],
  (error, message) => error ? message : null
);

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
  [SET_ERROR]: (state, { payload }) => state.set('error', fromJS(payload)),
  [CLEAR_ERROR]: (state, { payload }) => state.set('error', null).set('status', RequestStatus.NONE)
}, initialState);
