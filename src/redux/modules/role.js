import {createAction, handleActions} from 'redux-actions'
import {Record, List, Map} from 'immutable'
import {normalize} from 'normalizr'

import {request, CLEAR_CACHE} from './app'
import roleSchema from 'schema/role'

const RoleState = new Record({
  result: new List(),
  entities: new Map()
})

const initialState = new RoleState()

export const SET_ROLE = 'SET_ROLE'

export const setRole = createAction(SET_ROLE, data =>
  normalize(data, [roleSchema])
)
export const fetchRole = () => dispatch => {
  dispatch(
    request(
      {
        url: 'roles'
      },
      ({roles}) => {
        dispatch(setRole(roles))
      }
    )
  )
}

export const actions = {
  setRole,
  fetchRole
}

export default handleActions(
  {
    [SET_ROLE]: (state, {payload}) => state.merge(payload),
    [CLEAR_CACHE]: () => new RoleState()
  },
  initialState
)
