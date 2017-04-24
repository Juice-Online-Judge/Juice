import {createAction, handleActions} from 'redux-actions'
import {fromJS, Record, List, Map} from 'immutable'
import {normalize} from 'normalizr'
import omit from 'lodash/omit'
import mapValues from 'lodash/mapValues'
import {createSelector} from 'reselect'

import {createFormDataDeep} from 'lib/utils'
import {request} from './app'
import {showMessage} from './message'
import questionSchema from 'schema/question'
import isRequesting from 'lib/isRequesting'

const QuestionState = new Record({
  result: new List(),
  entities: new Map(),
  page: 1,
  total: 0
})

const initialState = new QuestionState()

const SET_QUESTION = 'SET_QUESTION'
const SET_QUESTION_DETAIL = 'SET_QUESTION_DETAIL'
const CLEAR_QUESTION = 'CLEAR_QUESTION'

const markDetail = question => ({
  detail: true,
  ...question
})

export const setQuestion = createAction(
  SET_QUESTION,
  ({data, page, total, detail}) => {
    const payload = {
      page,
      total,
      ...normalize(data, [questionSchema])
    }
    const questions = payload.entities.question

    if (detail) {
      payload.entities.question = mapValues(questions, markDetail)
    }

    return payload
  }
)

export const setQuestionDetail = createAction(SET_QUESTION_DETAIL, payload => {
  return {detail: true, ...payload}
})

export const clearQuestion = createAction(CLEAR_QUESTION)

export const fetchQuestion = (query = {page: 1}, opts = {force: false}) => (
  dispatch,
  getState
) => {
  const {app, question} = getState()
  const page = question.get('page')
  const uuids = question.get('result')

  if (!opts.force) {
    if ((page === query.page && uuids.size) || isRequesting(app)) {
      return
    }
  }

  dispatch(
    request(
      {
        url: 'questions',
        params: query
      },
      entity => {
        dispatch(
          setQuestion({
            data: entity.data,
            page: query.page,
            total: entity.total
          })
        )
      }
    )
  )
}

export const fetchQuestionDetail = (uuid, opts = {force: false}) => (
  dispatch,
  getState
) => {
  const entities = getState().question.get('entities')

  if (entities.has(uuid) && entities.getIn([uuid, 'detail']) && !opts.force) {
    return
  }

  dispatch(
    request(
      {
        url: `questions/${uuid}`
      },
      ({question}) => {
        dispatch(setQuestionDetail(question))
      }
    )
  )
}

export const addQuestion = data => dispatch => {
  data = createFormDataDeep(data)
  if (!data.uuid) {
    Reflect.deleteProperty(data, 'uuid')
  }

  return dispatch(
    request(
      {
        method: 'POST',
        url: 'questions',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data
      },
      entity => {
        dispatch(setQuestionDetail(entity))
        dispatch(showMessage('Add success'))
      },
      () => {
        dispatch(showMessage('Add fail'))
      }
    )
  )
}

// Selector

const questionUuidSelector = (state, props) =>
  state.question.getIn(['entities', 'question', props.uuid], new Map())
export const questionSelector = createSelector(
  [questionUuidSelector],
  ques => ques
)

export const actions = {
  fetchQuestion,
  fetchQuestionDetail,
  addQuestion,
  setQuestion,
  setQuestionDetail
}

const mergeQuestion = (state, payload) =>
  state.withMutations(state => {
    const keys = state.getIn(['entities', 'question'], new Map()).keys()
    const question = omit(payload.entities.question, keys)

    state.set('result', fromJS(payload.result))
    state.mergeIn(['entities', 'question'], question)
  })

export default handleActions(
  {
    [SET_QUESTION]: (state, {payload}) =>
      mergeQuestion(state, payload).merge(omit(payload, 'entities')),
    [SET_QUESTION_DETAIL]: (state, {payload}) =>
      state.setIn(['entities', 'question', payload.uuid], fromJS(payload)),
    [CLEAR_QUESTION]: () => new QuestionState()
  },
  initialState
)
