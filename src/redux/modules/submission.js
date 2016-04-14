import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS } from 'immutable';
import api from 'lib/api';

import { RequestStatus } from 'lib/const';
import { setStatus, setError } from './app';

const SubmissionState = new Record({
  submissions: []
});

const initialState = new SubmissionState();

const SET_SUBMISSIONS = 'SET_SUBMISSIONS';

export const setSubmissions = createAction(SET_SUBMISSIONS);

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

export const fetchSubmissions = (opts = { force: false }) => {
  return (dispatch, getState) => {
    const { submission } = getState();
    if (submission.get('submissions').size && !opts.force) {
      return;
    }

    dispatch(setStatus(RequestStatus.PENDING));
    api({
      path: '/account/submissions'
    })
    .entity()
    .then((entity) => {
      dispatch(setSubmissions(entity));
      dispatch(setStatus(RequestStatus.SUCCESS));
    })
    .catch(handleError.bind(null, dispatch));
  };
};

export const actions = {
  fetchSubmissions,
  submitCode
};

export default handleActions({
  [SET_SUBMISSIONS]: (state, { payload }) => state.set('submissions', fromJS(payload))
}, initialState);
