import {createAction, handleActions} from 'redux-actions'
import {createSelector} from 'reselect'
import {fromJS, Record} from 'immutable'

import {RequestStatus} from 'lib/const'
import {clearExam} from './exam'
import {clearQuestion} from './question'
import {clearSubmissions} from './submission'
import {clearUsers} from './users'
import guardRequest from '../utils/guardRequest'

export const AppRecord = new Record({
  status: RequestStatus.NONE,
  error: null
})

export class App extends AppRecord {
  isPending() {
    return this.status === RequestStatus.PENDING
  }

  isError() {
    return this.status === RequestStatus.FAIL
  }

  get messages() {
    return this.isError ? this.getIn(['error', 'messages']) : null
  }

  get errorCode() {
    return this.isError ? this.getIn(['error', 'code']) : null
  }
}

export const initialState = new App()

export const SET_STATUS = 'SET_STATUS'
export const SET_ERROR = 'SET_ERROR'
export const CLEAR_STATUS = 'CLEAR_STATUS'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export const setStatus = createAction(SET_STATUS)
export const setError = createAction(SET_ERROR)
export const clearStatus = createAction(CLEAR_STATUS)
export const clearError = createAction(CLEAR_ERROR)

export const request = (config, handleSuccess, handleError) => dispatch => {
  return guardRequest(dispatch, config, handleSuccess, handleError)
}

export const clearCache = () => dispatch => {
  dispatch(clearExam())
  dispatch(clearQuestion())
  dispatch(clearSubmissions())
  dispatch(clearUsers())
}

export const appStatusSelector = state => state.app.get('status')
const appSelector = state => state.app
const appErrorSelector = state => state.app.messages
const appErrorCodeSelector = state => state.app.errorCode

export const isPendingSelector = createSelector([appSelector], app =>
  app.isPending()
)

export const createIsErrorSelector = () =>
  createSelector([appSelector], app => app.isError())

export const errorCodeSelector = createSelector(
  [createIsErrorSelector(), appErrorCodeSelector],
  (error, errorCode) => (error ? errorCode : null)
)

export const createErrorSelector = () =>
  createSelector(
    [createIsErrorSelector(), appErrorSelector],
    (error, message) => (error ? message : null)
  )

export const actions = {
  setStatus,
  setError,
  clearStatus,
  clearError,
  clearCache
}

export default handleActions(
  {
    [SET_STATUS]: (state, {payload}) => state.set('status', payload),
    [CLEAR_STATUS]: state => state.set('status', RequestStatus.NONE),
    [SET_ERROR]: (state, {payload}) => state.set('error', fromJS(payload)),
    [CLEAR_ERROR]: (state, {payload}) =>
      state.set('error', null).set('status', RequestStatus.NONE)
  },
  initialState
)
