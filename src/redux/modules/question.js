import { createAction, handleActions } from 'redux-actions';
import { fromJS, Record, List, Map } from 'immutable';
import { normalize, arrayOf } from 'normalizr';
import omit from 'lodash/omit';

import api from 'lib/api';
import questionSchema from 'schema/question';
import { RequestStatus } from 'lib/const';
import { setStatus } from './app';
import { handleRequestError } from '../utils/handleRequestError';

const QuestionState = new Record({
  result: new List(),
  entities: new Map(),
  page: 1,
  total: 0
});

const initialState = new QuestionState();

const SET_QUESTION = 'SET_QUESTION';
const SET_QUESTION_DETAIL = 'SET_QUESTION_DETAIL';

export const setQuestion = createAction(SET_QUESTION);
export const setQuestionDetail = createAction(SET_QUESTION_DETAIL, (payload) => {
  return {detail: true, ...payload};
});

export const fetchQuestion = (query = { page: 1 }, opts = { force: false }) => {
  return (dispatch, getState) => {
    const { app, question } = getState();
    const page = question.get('page');
    const uuids = question.get('result');
    const status = app.get('status');

    if (page === query.page && uuids.size && !opts.force) {
      return;
    }

    if (status === RequestStatus.PENDING && !opts.force) {
      return;
    }

    dispatch(setStatus(RequestStatus.PENDING));

    api({
      path: 'questions',
      params: query
    })
    .then(({ entity }) => {
      const questions = normalize(entity.data, arrayOf(questionSchema));

      dispatch(setQuestion({
        ...questions,
        page: query.page,
        total: entity.total
      }));

      dispatch(setStatus(RequestStatus.SUCCESS));
    })
    .catch(handleRequestError.bind(null, dispatch));
  };
};

export const fetchQuestionDetail = (uuid, opts = { force: false }) => {
  return (dispatch, getState) => {
    const entities = getState().question.get('entities');

    if (entities.has(uuid) && entities.getIn([uuid, 'detail']) && !opts.force) {
      return;
    }

    dispatch(setStatus(RequestStatus.PENDING));
    api({
      path: 'questions/{uuid}',
      params: {
        uuid
      }
    })
    .then(({ entity }) => {
      dispatch(setQuestionDetail(entity));
      dispatch(setStatus(RequestStatus.SUCCESS));
    })
    .catch(handleRequestError.bind(null, dispatch));
  };
};

export const addQuestion = (data) => {
  return (dispatch) => {
    dispatch(setStatus(RequestStatus.PENDING));

    if (!data.uuid) {
      delete data.uuid;
    }

    api({
      path: 'questions',
      methods: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      entity: data
    })
    .then(({ entity }) => {
      dispatch(setQuestionDetail(entity));
      dispatch(setStatus(RequestStatus.SUCCESS));
    })
    .catch(handleRequestError.bind(null, dispatch));
  };
};

// Selector

export const questionSelector = (state, props) => state.question
  .getIn(['entities', 'question', props.uuid], new Map());

export const actions = {
  fetchQuestion,
  fetchQuestionDetail,
  addQuestion,
  setQuestion,
  setQuestionDetail
};

const mergeQuestion = (state, payload) => {
  return state.withMutations((state) => {
    const keys = state.getIn(['entities', 'question'], new Map()).keys();
    const question = omit(payload.entities.question, keys);
    state.set('result', fromJS(payload.result));
    state.mergeIn(['entities', 'question'], question);
  });
};

export default handleActions({
  [SET_QUESTION]: (state, { payload }) => mergeQuestion(state, payload).merge(omit(payload, 'entities')),
  [SET_QUESTION_DETAIL]: (state, { payload }) => state
    .setIn(['entities', 'question', payload.uuid], fromJS(payload))
}, initialState);
