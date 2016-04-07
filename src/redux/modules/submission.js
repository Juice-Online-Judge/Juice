import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';
import api from 'lib/api';
import { RequestStatus } from 'lib/const';

const SubmissionState = new Record({
  status: RequestStatus.NONE,
  error: null
});

const initialState = new SubmissionState();

const SET_STATUS = 'SET_STATUS';
const SET_ERROR = 'SET_ERROR';
const CLEAR_STATUS = 'CLEAR_STATUS';

export const setStatus = createAction(SET_STATUS);
export const setError = createAction(SET_ERROR);
export const clearStatus = createAction(CLEAR_STATUS);

const handleError = (dispatch, error) => {
  dispatch(setStatus(RequestStatus.FAIL));
  dispatch(setError('Server error'));
  if (error instanceof Error) {
    throw error;
  }
};

export const submitCode = (uuid, data) => {
  return (dispatch) => {
    api({
      path: 'submissions/{uuid}',
      params: {
        uuid
      },
      entity: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .entity()
    .then((entity) => {
      dispatch(setStatus(RequestStatus.SUCCESS));
    })
    .catch(handleError.bind(null, dispatch));
  };
};

export const actions = {
  submitCode,
  setStatus,
  setError,
  clearStatus
};

export default handleActions({
  [SET_STATUS]: (state, { payload }) => state.set('status', payload),
  [SET_ERROR]: (state, { payload }) => state.set('error', payload),
  [CLEAR_STATUS]: (state) => state.set('status', RequestStatus.NONE)
}, initialState);
