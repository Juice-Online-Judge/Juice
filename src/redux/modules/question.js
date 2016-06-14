import { takeEvery } from 'redux-saga';
import { select, put, call } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import { fromJS, Record, List, Map } from 'immutable';
import { normalize, arrayOf } from 'normalizr';
import omit from 'lodash/omit';
import mapValues from 'lodash/mapValues';
import { createSelector } from 'reselect';

import { createFormDataDeep } from 'lib/utils';
import { request } from './app';
import { showMessage } from './message';
import questionSchema from 'schema/question';
import isRequesting from 'lib/isRequesting';

const QuestionState = new Record({
  result: new List(),
  entities: new Map(),
  page: 1,
  total: 0
});

const initialState = new QuestionState();

const SET_QUESTION = 'SET_QUESTION';
const SET_QUESTION_DETAIL = 'SET_QUESTION_DETAIL';
const CLEAR_QUESTION = 'CLEAR_QUESTION';
export const FETCH_QUESTION = 'FETCH_QUESTION';
export const FETCH_QUESTION_DETIAL = 'FETCH_QUESTION_DETIAL';
export const ADD_QUESTION = 'ADD_QUESTION';

const markDetail = (question) => ({
  detail: true,
  ...question
});

export const setQuestion = createAction(SET_QUESTION, ({ data, page, total, detail }) => {
  const payload = {
    page,
    total,
    ...normalize(data, arrayOf(questionSchema))
  };
  const questions = payload.entities.question;

  if (detail) {
    payload.entities.question = mapValues(questions, markDetail);
  }

  return payload;
});

export const setQuestionDetail = createAction(SET_QUESTION_DETAIL, (payload) => {
  return {detail: true, ...payload};
});

export const clearQuestion = createAction(CLEAR_QUESTION);
export const fetchQuestion = createAction(FETCH_QUESTION, (query, opts) => ({ query, opts }));
export const fetchQuestionDetail = createAction(FETCH_QUESTION_DETIAL, (query, opts) => ({ query, opts }));
export const addQuestion = createAction(ADD_QUESTION);

export function* fetchQuestionFlow({ payload: { query = { page: 1 }, opts = { force: false } } }) {
  const { app, question } = yield select();
  const page = question.get('page');
  const uuids = question.get('result');

  if (!opts.force) {
    if ((page === query.page && uuids.size) || isRequesting(app)) {
      return;
    }
  }

  const { error, entity } = yield call(request, {
    path: 'questions',
    params: query
  });

  if (!error) {
    yield put(setQuestion({
      data: entity.data,
      page: query.page,
      total: entity.total
    }));
  }
}

export function* fetchQuestionDetailFlow({ payload: { uuid, opts = { force: false } } }) {
  const entities = yield select((state) => state.question.get('entities'));

  if (entities.has(uuid) && entities.getIn([uuid, 'detail']) && !opts.force) {
    return;
  }

  const { error, entity } = yield call(request, {
    path: 'questions/{uuid}',
    params: {
      uuid
    }
  });

  if (!error) {
    yield put(setQuestionDetail(entity));
  }
}

export function* addQuestionFlow({ payload }) {
  const data = createFormDataDeep(payload);
  if (!data.uuid) {
    delete data.uuid;
  }

  const { error, entity } = yield call(request, {
    path: 'questions',
    methods: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    entity: data
  });
  if (!error) {
    yield put(setQuestionDetail(entity));
    yield put(showMessage('Add success'));
  } else {
    yield put(showMessage('Add fail'));
  }
}

// Selector

const questionUuidSelector = (state, props) => state.question
  .getIn(['entities', 'question', props.uuid], new Map());
export const questionSelector = createSelector(
  [questionUuidSelector],
  (ques) => ques
);

export function* watcher() {
  yield [
    takeEvery(FETCH_QUESTION, fetchQuestionFlow),
    takeEvery(FETCH_QUESTION_DETIAL, fetchQuestionDetailFlow),
    takeEvery(ADD_QUESTION, addQuestionFlow)
  ];
}

export const actions = {
  fetchQuestion,
  fetchQuestionDetail,
  addQuestion,
  setQuestion,
  setQuestionDetail
};

const mergeQuestion = (state, payload) => state.withMutations((state) => {
  const keys = state.getIn(['entities', 'question'], new Map()).keys();
  const question = omit(payload.entities.question, keys);

  state.set('result', fromJS(payload.result));
  state.mergeIn(['entities', 'question'], question);
});

export default handleActions({
  [SET_QUESTION]: (state, { payload }) => mergeQuestion(state, payload).merge(omit(payload, 'entities')),
  [SET_QUESTION_DETAIL]: (state, { payload }) => state
    .setIn(['entities', 'question', payload.uuid], fromJS(payload)),
  [CLEAR_QUESTION]: () => new QuestionState()
}, initialState);
