import { takeEvery } from 'redux-saga';
import { select, put, call } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import { Record, Map, List } from 'immutable';
import { normalize, arrayOf } from 'normalizr';
import omit from 'lodash/omit';
import map from 'lodash/map';

import examSchema from 'schema/exam';
import isRequesting from 'lib/isRequesting';
import { renameKeys } from 'lib/utils';
import { request } from './app';
import { setQuestion } from './question';
import { isLogin } from './account';
import { showMessage } from './message';

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
export const CLEAR_EXAM = 'CLEAR_EXAM';
export const FETCH_EXAMS = 'FETCH_EXAMS';
export const ADD_EXAM = 'ADD_EXAM';
export const FETCH_EXAM_QUESTION = 'FETCH_EXAM_QUESTION';
export const FETCH_EXAM_TOKEN = 'FETCH_EXAM_TOKEN';

export const setExam = createAction(SET_EXAM, ({ page, total, data }) => ({
  page,
  total,
  ...normalize(data, arrayOf(examSchema))
}));

export const setExamToken = createAction(SET_EXAM_TOKEN);
export const clearExam = createAction(CLEAR_EXAM);
export const fetchExams = createAction(FETCH_EXAMS, (query, opts) => ({ query, opts }));
export const addExam = createAction(ADD_EXAM);
export const fetchExamQuestion = createAction(FETCH_EXAM_QUESTION);
export const fetchExamToken = createAction(FETCH_EXAM_TOKEN);

export function* fetchExamsFlow({ payload: { query, opts = { force: false } } }) {
  const { app, account, exam } = yield select();
  const page = exam.get('page');
  query = query || { page };

  if (isRequesting(app) && !opts.force) {
    return;
  }

  if (exam.get('result').size && query.page === page && !opts.force) {
    return;
  }

  if (!isLogin(account)) {
    return;
  }

  const { error, entity } = yield call(request, {
    path: 'exams',
    params: query
  });

  if (!error) {
    yield put(setExam({ page: query.page, total: entity.total, data: entity.data }));
  }
};

export function* addExamFlow({ payload }) {
  const examData = {
    name: payload.name,
    role_id: payload.roleId,
    began_at: payload.beganTime,
    ended_at: payload.endedTime,
    user: payload.users,
    question: map(payload.questions, (val, key) => ({
      uuid: key,
      info: JSON.stringify(renameKeys(val, {
        readFrom: 'read_from',
        codeReview: 'code_review'
      }))
    }))
  };

  // No need to check login state here
  // Because of we check it when access add exam page

  const { error } = yield call(request, {
    path: 'exams',
    entity: examData
  });

  if (!error) {
    yield put(showMessage('Add success'));
  } else {
    yield put(showMessage('Add fail'));
  }
};

export function* fetchExamQuestionFlow({ payload }) {
  const account = yield select((state) => state.account);

  if (!isLogin(account)) {
    return;
  }

  const { error, entity } = yield call(request, {
    path: 'exams/{id}/questions',
    params: {
      id: payload
    }
  });

  if (!error) {
    yield put(setQuestion({
      total: entity.length,
      page: 1,
      data: entity,
      detail: true
    }));
  }
};

export function* fetchExamTokenFlow({ payload }) {
  const account = yield select((state) => state.account);

  if (!isLogin(account)) {
    return;
  }

  const { error, entity } = yield call(request, {
    path: 'exams/{id}/token',
    params: {
      id: payload
    }
  });

  if (!error) {
    yield put(setExamToken({
      id: payload,
      token: entity
    }));
  }
};

export function* watcher() {
  yield [
    takeEvery(FETCH_EXAMS, fetchExamsFlow),
    takeEvery(ADD_EXAM, addExamFlow),
    takeEvery(FETCH_EXAM_QUESTION, fetchExamQuestionFlow),
    takeEvery(FETCH_EXAM_TOKEN, fetchExamTokenFlow)
  ];
}

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
  [SET_EXAM_TOKEN]: (state, { payload }) => state.setIn(['tokens', `${payload.id}`], payload.token),
  [CLEAR_EXAM]: () => new ExamStatus()
}, initialState);
