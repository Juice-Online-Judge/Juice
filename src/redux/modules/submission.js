import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS } from 'immutable';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import { createFormDataDeep } from 'lib/utils';

import guardRequest from '../utils/guardRequest';

const SubmissionState = new Record({
  submissions: [],
  code: ''
});

const initialState = new SubmissionState();

const SET_SUBMISSIONS = 'SET_SUBMISSIONS';
const SET_SUBMISSION_CODE = 'SET_SUCMISSION_CODE';
const CLEAR_SUBMISSIONS = 'CLEAR_SUBMISSIONS';

export const setSubmissions = createAction(SET_SUBMISSIONS);
export const setSubmissionCode = createAction(SET_SUBMISSION_CODE);
export const clearSubmissions = createAction(CLEAR_SUBMISSIONS);

export const submitCode = (submitData) => (dispatch) => {
  const { uuid, examId, ...data } = submitData;
  guardRequest(dispatch, {
    path: 'submissions/{uuid}',
    params: {
      uuid
    },
    entity: createFormDataDeep(omitBy({ ...data, exam_id: examId }, isNil)),
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const fetchSubmissions = (opts = { force: false }) => (dispatch, getState) => {
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

export const fetchCode = (id) => (dispatch) => {
  guardRequest(dispatch, {
    path: 'submissions/{id}/code',
    params: {
      id
    }
  }, (entity) => {
    dispatch(setSubmissionCode(entity));
  });
};

export const actions = {
  fetchSubmissions,
  submitCode
};

export default handleActions({
  [SET_SUBMISSIONS]: (state, { payload }) => state.set('submissions', fromJS(payload)),
  [CLEAR_SUBMISSIONS]: () => new SubmissionState()
}, initialState);
