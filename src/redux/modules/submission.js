import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import { normalize, arrayOf } from 'normalizr';
import { createFormDataDeep } from 'lib/utils';

import guardRequest from '../utils/guardRequest';
import submissionSchema from 'schema/submission';

const SubmissionState = new Record({
  result: [],
  entities: {},
  code: ''
});

const initialState = new SubmissionState();

const SET_SUBMISSIONS = 'SET_SUBMISSIONS';
const SET_SUBMISSION_CODE = 'SET_SUCMISSION_CODE';
const CLEAR_SUBMISSIONS = 'CLEAR_SUBMISSIONS';

export const setSubmissions = createAction(SET_SUBMISSIONS, (data) => normalize(data, arrayOf(submissionSchema)));
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
  if (submission.get('result').size && !opts.force) {
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
  [SET_SUBMISSIONS]: (state, { payload }) => state.merge(payload),
  [CLEAR_SUBMISSIONS]: () => new SubmissionState()
}, initialState);
