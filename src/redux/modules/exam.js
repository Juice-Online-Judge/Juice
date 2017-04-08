import {createAction, handleActions} from 'redux-actions'
import {Record, Map, List} from 'immutable'
import {normalize} from 'normalizr'
import omit from 'lodash/omit'
import map from 'lodash/map'
import {replace} from 'react-router-redux'

import examSchema from 'schema/exam'
import isRequesting from 'lib/isRequesting'
import {renameKeys} from 'lib/utils'
import {request} from './app'
import {setQuestion} from './question'
import {isLogin} from './account'
import {showMessage} from './message'

const ExamStatus = new Record({
  result: new List(),
  entities: new Map(),
  page: 1,
  total: 0,
  tokens: new Map()
})

const initialState = new ExamStatus()

export const SET_EXAM = 'SET_EXAM'
export const SET_EXAM_TOKEN = 'SET_EXAM_TOKEN'
export const CLEAR_EXAM = 'CLEAR_EXAM'

export const setExam = createAction(SET_EXAM, ({page, total, data}) => ({
  page,
  total,
  ...normalize(data, [examSchema])
}))

export const setExamToken = createAction(SET_EXAM_TOKEN)
export const clearExam = createAction(CLEAR_EXAM)

export const fetchExams = (query, opts = {force: false}) =>
  (dispatch, getState) => {
    const {app, account, exam} = getState()
    const page = exam.get('page')
    query = query || {page}

    if (isRequesting(app) && !opts.force) {
      return
    }

    if (exam.get('result').size && query.page === page && !opts.force) {
      return
    }

    if (!isLogin(account)) {
      dispatch(replace('/sign-in'))
      return
    }

    dispatch(
      request(
        {
          url: 'exams',
          params: query
        },
        entity => {
          dispatch(
            setExam({
              page: query.page,
              total: entity.total,
              data: entity.data
            })
          )
        }
      )
    )
  }

export const addExam = data =>
  dispatch => {
    const examData = {
      name: data.name,
      role_id: data.roleId,
      began_at: data.beganTime,
      ended_at: data.endedTime,
      user: data.users,
      question: map(data.questions, (val, key) => ({
        uuid: key,
        info: JSON.stringify(
          renameKeys(val, {
            readFrom: 'read_from',
            codeReview: 'code_review'
          })
        )
      }))
    }

    // No need to check login state here
    // Because of we check it when access add exam page

    return dispatch(
      request(
        {
          method: 'post',
          url: 'exams',
          data: examData
        },
        () => {
          dispatch(showMessage('Add success'))
        },
        () => {
          dispatch(showMessage('Add fail'))
        }
      )
    )
  }

export const fetchExamQuestion = examId =>
  (dispatch, getState) => {
    const {account} = getState()

    if (!isLogin(account)) {
      return
    }

    dispatch(
      request(
        {
          url: `exams/${examId}/questions`
        },
        ({questions}) => {
          questions.sort((a, b) => {
            if (a.uuid > b.uuid) {
              return 1
            } else if (a.uuid < b.uud) {
              return -1
            }
            return 0
          })

          dispatch(
            setQuestion({
              total: questions.length,
              page: 1,
              data: questions,
              detail: true
            })
          )
        }
      )
    )
  }

export const fetchExamToken = examId =>
  (dispatch, getState) => {
    const {account} = getState()

    if (!isLogin(account)) {
      return
    }

    dispatch(
      request(
        {
          url: `exams/${examId}/token`
        },
        entity => {
          dispatch(
            setExamToken({
              id: examId,
              token: entity
            })
          )
        }
      )
    )
  }

export const actions = {
  setExam,
  fetchExams,
  fetchExamQuestion,
  fetchExamToken,
  addExam
}

export default handleActions(
  {
    [SET_EXAM]: (state, {payload}) =>
      state
        .merge(omit(payload, 'entities'))
        .mergeDeep({entities: payload.entities}),
    [SET_EXAM_TOKEN]: (state, {payload}) =>
      state.setIn(['tokens', `${payload.id}`], payload.token),
    [CLEAR_EXAM]: () => new ExamStatus()
  },
  initialState
)
