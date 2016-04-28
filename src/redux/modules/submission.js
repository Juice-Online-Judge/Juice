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
const SET_SUBMISSION = 'SET_SUBMISSION';
const SET_SUBMISSION_CODE = 'SET_SUCMISSION_CODE';
const CLEAR_SUBMISSIONS = 'CLEAR_SUBMISSIONS';

export const setSubmissions = createAction(SET_SUBMISSIONS, (data) => normalize(data, arrayOf(submissionSchema)));
export const setSubmission = createAction(SET_SUBMISSION, (data) => normalize(data, submissionSchema));
export const setSubmissionCode = createAction(SET_SUBMISSION_CODE);
export const clearSubmissions = createAction(CLEAR_SUBMISSIONS);

export const submitCode = (submitData) => (dispatch) => {
  const { uuid, examId, ...data } = submitData;
  return guardRequest(dispatch, {
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

export const fetchExamSubmissions = (id, opts = { force: false }) => (dispatch) => {
  guardRequest(dispatch, {
    path: '/exams/{id}/submissions',
    params: {
      id
    }
  }, (entity) => {
    dispatch(setSubmissions(entity));
  });
};

export const fetchSubmission = (id, opts = { force: false }) => (dispatch, getState) => {
  const { submission } = getState();
  id = `${id}`;
  if (submission.hasIn(['entities', 'submission', id]) && !opts.force) {
    return;
  }

  guardRequest(dispatch, {
    path: '/submissions/{id}',
    params: {
      id
    }
  }, (entity) => {
    dispatch(setSubmission(entity));
  });
};

export const fetchCode = (id) => (dispatch) => {
  id = parseInt(id);
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
  fetchSubmission,
  fetchExamSubmissions,
  fetchCode,
  submitCode
};

export default handleActions({
  [SET_SUBMISSIONS]: (state, { payload }) => state.merge(payload),
  [SET_SUBMISSION]: (state, { payload }) => state.merge(payload),
  [CLEAR_SUBMISSIONS]: () => new SubmissionState(),
  [SET_SUBMISSION_CODE]: (state, { payload }) => state.set('code', payload)
}, initialState);
