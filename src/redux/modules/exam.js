import { createAction, handleActions } from 'redux-actions';
import { Record, Map, List } from 'immutable';
import { normalize, arrayOf } from 'normalizr';
import omit from 'lodash/omit';

import examSchema from 'schema/exam';
import guardRequest from '../utils/guardRequest';
import isRequesting from 'lib/isRequesting';
import { setQuestion } from './question';

const ExamStatus = new Record({
  result: new List(),
  entities: new Map(),
  page: 1,
  total: 0,
  tokens: new Map()
});

const initialState = new ExamStatus();

export const SET_EXAM = 'SET_EXAM';
export const SET_EXAM_TOKEN = 'SET_EXAM_TOKEN';

export const setExam = createAction(SET_EXAM, ({ page, total, data }) => ({
  page,
  total,
  ...normalize(data, arrayOf(examSchema))
}));

export const setExamToken = createAction(SET_EXAM_TOKEN);

export const fetchExams = (query, opts = { force: false }) => {
  return (dispatch, getState) => {
    const { app, exam } = getState();
    const page = exam.get('page');
    query = query || { page };

    if (isRequesting(app)) {
      return;
    }

    if (exam.get('result').size && query.page === page && !opts.force) {
      return;
    }

    guardRequest(dispatch, {
      path: 'exams',
      params: query
    }, (entity) => {
      dispatch(setExam({ page: query.page, total: entity.total, data: entity.data }));
    });
  };
};

export const addExam = (data) => {
  return (dispatch) => {
  };
};

export const fetchExamQuestion = (examId) => {
  return (dispatch) => {
    guardRequest(dispatch, {
      path: 'exams/{id}/questions',
      params: {
        id: examId
      }
    }, (entity) => {
      dispatch(setQuestion({
        total: entity.length,
        page: 1,
        data: entity,
        detail: true
      }));
    });
  };
};

export const fetchExamToken = (examId) => {
  return (dispatch) => {
    guardRequest(dispatch, {
      path: 'exams/{id}/token',
      params: {
        id: examId
      }
    }, (entity) => {
      dispatch(setExamToken({
        id: examId,
        token: entity
      }));
    });
  };
};

export const actions = {
  setExam,
  fetchExams,
  fetchExamQuestion,
  fetchExamToken,
  addExam
};

export default handleActions({
  [SET_EXAM]: (state, { payload }) => state.merge(omit(payload, 'entities'))
    .mergeDeep({ entities: payload.entities }),
  [SET_EXAM_TOKEN]: (state, { payload }) => state.setIn(['tokens', `${payload.id}`], payload.token)
}, initialState);
