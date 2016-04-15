import { createAction, handleActions } from 'redux-actions';
import { fromJS, Record, List, Map } from 'immutable';
import omit from 'lodash/omit';

import api from 'lib/api';
import { RequestStatus } from 'lib/const';
import { setStatus } from './app';
import { handleRequestError } from '../utils/handleRequestError';

const QuestionState = new Record({
  uuids: new List(),
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

const normalizeQuestion = (questions) => {
  let uuids = [];
  let entities = {};
  questions.forEach((question) => {
    uuids.push(question.uuid);
    entities[question.uuid] = { detail: false, ...omit(question, 'uuid') };
  });

  return {
    uuids,
    entities
  };
};

export const fetchQuestion = (query = { page: 1 }, opts = { force: false }) => {
  return (dispatch, getState) => {
    const { app, question } = getState();
    const page = question.get('page');
    const uuids = question.get('uuids');
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
      const questions = normalizeQuestion(entity.data);
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
  .getIn(['entities', props.uuid], new Map());

export const actions = {
  fetchQuestion,
  fetchQuestionDetail,
  addQuestion,
  setQuestion,
  setQuestionDetail
};

export default handleActions({
  [SET_QUESTION]: (state, { payload }) => {
    return state
    .updateIn(['entities'], (entities) => entities.withMutations((entities) => {
      return entities.merge(payload.entities).merge(state.get('entities'));
    }))
    .merge(omit(payload, 'entities'));
  },
  [SET_QUESTION_DETAIL]: (state, { payload }) => state
    .setIn(['entities', payload.uuid], fromJS(omit(payload, 'uuid')))
}, initialState);
