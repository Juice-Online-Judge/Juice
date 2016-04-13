import { createAction, handleActions } from 'redux-actions';
import { fromJS, Record, List, Map } from 'immutable';
import api from 'lib/api';
import { RequestStatus } from 'lib/const';
import omit from 'lodash/omit';

const QuestionState = new Record({
  uuids: new List(),
  entities: new Map(),
  status: RequestStatus.PENDING,
  page: 1,
  total: 0,
  error: null
});

const initialState = new QuestionState();

const SET_QUESTION = 'SET_QUESTION';
const SET_QUESTION_DETAIL = 'SET_QUESTION_DETAIL';
const SET_STATUS = 'SET_STATUS';
const SET_ERROR = 'SET_ERROR';
const CLEAR_STATUS = 'CLEAR_STATUS';

export const setQuestion = createAction(SET_QUESTION);
export const setQuestionDetail = createAction(SET_QUESTION_DETAIL, (payload) => {
  return {detail: true, ...payload};
});
export const setStatus = createAction(SET_STATUS);
export const setError = createAction(SET_ERROR);
export const clearStatus = createAction(CLEAR_STATUS);

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

const handleError = (dispatch, error) => {
  dispatch(setStatus(RequestStatus.FAIL));
  dispatch(setError('Server error'));
  if (error instanceof Error) {
    throw error;
  }
};

export const fetchQuestion = (query = { page: 1 }, opt = { force: false }) => {
  return (dispatch, getState) => {
    const state = getState().question;
    const page = state.get('page');
    const uuids = state.get('uuids');

    if (page == query.page && uuids.size && !opts.force) {
      return;
    }

    dispatch(setStatus(RequestStatus.PENDING));

    api({
      path: 'questions',
      params: query
    })
    .entity()
    .then((entity) => {
      const questions = normalizeQuestion(entity.data);
      dispatch(setQuestion({
        ...questions,
        page: query.page,
        total: entity.total
      }));
      dispatch(setStatus(RequestStatus.SUCCESS));
    })
    .catch(handleError.bind(null, dispatch));
  };
};

export const fetchQuestionDetail = (uuid, opts = { force: false }) => {
  return (dispatch, getState) => {
    const entities = getState().question.get('entities');

    if (entities.has(uuid) && !opts.force) {
      return;
    }

    dispatch(setStatus(RequestStatus.PENDING));
    api({
      path: 'questions/{uuid}',
      params: {
        uuid
      }
    })
    .entity()
    .then((entity) => {
      dispatch(setQuestionDetail(entity));
      dispatch(setStatus(RequestStatus.SUCCESS));
    })
    .catch(handleError.bind(null, dispatch));
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
    .entity()
    .then((entity) => {
      dispatch(setQuestionDetail(entity));
      dispatch(setStatus(RequestStatus.SUCCESS));
    })
    .catch(handleError.bind(null, dispatch));
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
  setQuestionDetail,
  setStatus,
  setError,
  clearStatus
};

export default handleActions({
  [SET_QUESTION]: (state, { payload }) => state.mergeIn(['entities'], payload.entities)
    .merge(omit(payload, 'entities')),
  [SET_QUESTION_DETAIL]: (state, { payload }) => state
    .setIn(['entities', payload.uuid], fromJS(omit(payload, 'uuid'))),
  [SET_STATUS]: (state, { payload }) => state.set('status', payload),
  [SET_ERROR]: (state, { payload }) => state.set('error', payload),
  [CLEAR_STATUS]: (state) => state.set('status', RequestStatus.NONE)
}, initialState);
