import { createAction, handleActions } from 'redux-actions';
import { Record, List, Map } from 'immutable';
import api from 'lib/api';
import omit from 'lodash/omit';

const QuestionState = new Record({
  uuids: new List(),
  entities: new Map(),
  loading: true,
  page: 0,
  total: 0,
  error: null
});

const initialState = new QuestionState();

const SET_QUESTION = 'SET_QUESTION';
const SET_QUESTION_DETAIL = 'SET_QUESTION_DETAIL';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

export const setQuestion = createAction(SET_QUESTION);
export const setQuestionDetail = createAction(SET_QUESTION_DETAIL, (payload) => {
  return {detail: true, ...payload};
});
export const setLoading = createAction(SET_LOADING);
export const setError = createAction(SET_ERROR);

const normalizeQuestion = (questions) => {
  let uuids = [];
  let entities = {};
  questions.forEach((question) => {
    uuids.push(question.uuid);
    entities[question.uuid] = { detail: true, ...omit(question, 'uuid') };
  });

  return {
    uuids,
    entities
  };
};

export const fetchQuestion = (query = { page: 1 }) => {
  return (dispatch) => {
    dispatch(setLoading(true));
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
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setLoading(false));
      dispatch(setError('Server error'));
      if (error instanceof Error) {
        throw error;
      }
    });
  };
};

export const fetchQuestionDetail = (uuid) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    api({
      path: 'questions/{uuid}',
      params: {
        uuid
      }
    })
    .entity()
    .then((entity) => {
      setQuestionDetail(entity);
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setLoading(false));
      dispatch(setError('Server error'));
      if (error instanceof Error) {
        throw error;
      }
    });
  };
};

// Selector

export const questionSelector = (state, props) => state.question.getIn(['entities', props.uuid]);

export const actions = {
  fetchQuestion,
  fetchQuestionDetail,
  setQuestion,
  setQuestionDetail,
  setLoading,
  setError
};

export default handleActions({
  [SET_QUESTION]: (state, { payload }) => state.mergeIn(['entities'], payload.entities)
    .merge(omit(payload, 'entities')),
  [SET_QUESTION_DETAIL]: (state, { payload }) => state.setIn(['entities', payload.uuid], omit(payload, 'uuid')),
  [SET_LOADING]: (state, { payload }) => state.set('loading', payload),
  [SET_ERROR]: (state, { payload }) => state.set('error', payload)
}, initialState);
