import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

const SubmissionFilterState = new Record({
  user: null,
  question: null
});

const initialState = new SubmissionFilterState();

const ADD_FILTER = 'ADD_FILTER';
const CLEAR_FILTER = 'CLEAR_FILTER';

export const addFilter = createAction(ADD_FILTER);
export const clearFilter = createAction(CLEAR_FILTER);

export default handleActions({
  [ADD_FILTER]: (state, { payload }) => state.merge(payload),
  [CLEAR_FILTER]: () => initialState
}, initialState);
