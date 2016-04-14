import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';

import { RequestStatus } from 'lib/const';

const AppStatus = new Immutable.Record({
  status: RequestStatus.NONE,
  error: null
});

const initialState = new AppStatus();

const SET_STATUS = 'SET_STATUS';
const SET_ERROR = 'SET_ERROR';
const CLEAR_STATUS = 'CLEAR_STATUS';

export const setStatus = createAction(SET_STATUS);
export const setError = createAction(SET_ERROR);
export const clearStatus = createAction(CLEAR_STATUS);

export const actions = {
  setStatus,
  setError,
  clearStatus
};

export default handleActions({
  [SET_STATUS]: (state, { payload }) => state.set('status', payload),
  [CLEAR_STATUS]: (state) => state.set('status', RequestStatus.NONE),
  [SET_ERROR]: (state, { payload }) => state.set('error', Immutable.fromJS(payload))
}, initialState);
