import { createAction, handleActions } from 'redux-actions';
import { Record, Map, List } from 'immutable';
import { normalize, arrayOf } from 'normalizr';
import omit from 'lodash/omit';

import api from 'lib/api';
import examSchema from 'schema/exam';
import { RequestStatus } from 'lib/const';
import { setStatus } from './app';
import handleRequestError from '../utils/handleRequestError';

const ExamStatus = new Record({
  result: new List(),
  entities: new Map(),
  page: 1,
  total: 0
});

const initialState = new ExamStatus();

export const SET_EXAM = 'SET_EXAM';

export const setExam = createAction(SET_EXAM);

export const fetchExams = (query, opts = { force: false }) => {
  return (dispatch, getState) => {
    const { exam } = getState();
    const page = exam.get('page');
    query = query || { page };

    if (exam.get('result').size && query.page === page && !opts.force) {
      return;
    }

    dispatch(setStatus(RequestStatus.PENDING));
    api({
      path: 'exams',
      params: query
    })
    .then(({ entity }) => {
      const data = normalize(entity.data, arrayOf(examSchema));
      dispatch(setExam({ page: query.page, total: entity.total, ...data }));
      dispatch(setStatus(RequestStatus.SUCCESS));
    })
    .catch(handleRequestError.bind(null, dispatch));
  };
};

export const actions = {
  setExam,
  fetchExams
};

export default handleActions({
  [SET_EXAM]: (state, { payload }) => state.merge(omit(payload, 'entities'))
    .mergeDeep({ entities: payload.entities })
}, initialState);
