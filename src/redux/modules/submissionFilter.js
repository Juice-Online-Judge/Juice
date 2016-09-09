import { createAction, handleActions } from 'redux-actions'
import { Record } from 'immutable'
import { createSelector } from 'reselect'

const SubmissionFilterState = new Record({
  user: null,
  question: null
})

const initialState = new SubmissionFilterState()

const ADD_FILTER = 'ADD_FILTER'
const CLEAR_FILTER = 'CLEAR_FILTER'

export const addFilter = createAction(ADD_FILTER)
export const clearFilter = createAction(CLEAR_FILTER)

const submissionSelector = ({ submission }) => submission
const submissionFilterSelector = ({ submissionFilter }) => submissionFilter

export const filterSubmissionSelector = createSelector(
  [submissionSelector, submissionFilterSelector],
  (submission, submissionFilter) => {
    const user = submissionFilter.get('user')
    const question = submissionFilter.get('question')
    const filterResult = submission.get('result').filter((id) => {
      const data = submission.getIn(['entities', 'submission', `${id}`])

      if (user && user !== data.getIn(['user', 'id'])) {
        return false
      }

      if (question && question !== data.getIn(['question', 'uuid'])) {
        return false
      }

      return true
    })
    return submission.set('result', filterResult)
  }
)

// Helper function

export const filterStringify = (filter) => {
  const user = filter.get('user')
  const question = filter.get('question')
  const result = []
  if (user) {
    result.push(`user:${user}`)
  }

  if (question) {
    result.push(`question:${question}`)
  }
  return result.join(' ')
}

export const parseFilter = (filterString) => {
  const filters = filterString.split(/\s+/)
  const parsedFilter = { user: null, question: null }
  if (filters.length > 2) {
    return null
  }

  if (!filterString) {
    return parsedFilter
  }

  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i].split(':')
    if (parsedFilter[filter[0]] !== null) {
      return null
    }
    parsedFilter[filter[0]] = filter[0] === 'user' ? parseInt(filter[1]) : filter[1]
  }

  return parsedFilter
}

export default handleActions({
  [ADD_FILTER]: (state, { payload }) => state.merge(payload),
  [CLEAR_FILTER]: () => initialState
}, initialState)
