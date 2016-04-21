import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS } from 'immutable';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

import guardRequest from '../utils/guardRequest';

const SubmissionState = new Record({
  submissions: []
});

const initialState = new SubmissionState();

const SET_SUBMISSIONS = 'SET_SUBMISSIONS';
const CLEAR_SUBMISSIONS = 'CLEAR_SUBMISSIONS';

export const setSubmissions = createAction(SET_SUBMISSIONS);
export const clearSubmissions = createAction(CLEAR_SUBMISSIONS);

export const submitCode = (submitData) => {
  return (dispatch) => {
    const { uuid, examId, ...data } = submitData;
    guardRequest(dispatch, {
      path: 'submissions/{uuid}',
      params: {
        uuid
      },
      entity: omitBy({ ...data, exam_id: examId }, isNil),
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };
};

export const fetchSubmissions = (opts = { force: false }) => {
  return (dispatch, getState) => {
    const { submission } = getState();
    if (submission.get('submissions').size && !opts.force) {
      return;
    }

    guardRequest(dispatch, {
      path: '/account/submissions'
    }, (entity) => {
      dispatch(setSubmissions(entity));
    });
  };
};

export const actions = {
  fetchSubmissions,
  submitCode
};

export default handleActions({
  [SET_SUBMISSIONS]: (state, { payload }) => state.set('submissions', fromJS(payload)),
  [CLEAR_SUBMISSIONS]: () => new SubmissionState()
}, initialState);
