import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';
import { createSelector } from 'reselect';

const SubmissionFilterState = new Record({
  user: null,
  question: null
});

const initialState = new SubmissionFilterState();

const ADD_FILTER = 'ADD_FILTER';
const CLEAR_FILTER = 'CLEAR_FILTER';

export const addFilter = createAction(ADD_FILTER);
export const clearFilter = createAction(CLEAR_FILTER);

const submissionSelector = ({ submission }) => submission;
const submissionFilterSelector = ({ submissionFilter }) => submissionFilter;

export const filterSubmissionSelector = createSelector(
  [submissionSelector, submissionFilterSelector],
  (submission, submissionFilter) => {
    const user = submissionFilter.get('user');
    const question = submissionFilter.get('question');
    const filterResult = submission.get('result').filter((id) => {
      const data = submission.getIn(['entities', 'submission', `${id}`]);
      var take = true;

      if (user && user !== data.getIn(['user', 'id'])) {
        take = false;
      }

      if (question && question !== data.getIn(['question', 'uuid'])) {
        take = false;
      }

      return take;
    });
    return submission.set('result', filterResult);
  }
);

export default handleActions({
  [ADD_FILTER]: (state, { payload }) => state.merge(payload),
  [CLEAR_FILTER]: () => initialState
}, initialState);
