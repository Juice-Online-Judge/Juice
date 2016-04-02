import { createAction, handleActions } from 'redux-actions';
import { Record, List } from 'immutable';
import api from 'lib/api';

const QuestionState = new Record({
  list: new List(),
  loading: true,
  page: 0,
  total: 0,
  error: null
});

const initialState = new QuestionState();

const SET_QUESTION = 'SET_QUESTION';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

export const setQuestion = createAction(SET_QUESTION);
export const setLoading = createAction(SET_LOADING);
export const setError = createAction(SET_ERROR);

export const fetchQuestion(query = { page: 1 }) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    api({
      path: 'questions',
      params: query
    })
    .entity()
    .then((entity) => {
      dispatch(setQuestion({
        list: entity.data,
        page: query.page,
        total: entity.total
      }));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setLoading(false));
      dispatch(setError('Server error'));
      if(error instanceof Error) {
        throw error;
      }
    });
  };
}

export default handleActions({
  [SET_QUESTION]: (state, { payload }) => state.merge(payload),
  [SET_LOADING]: (state, { payload }) => state.set('loading', payload),
  [SET_ERROR]: (state, { payload }) => state.set('error', payload)
}, initialState);
