import { createAction, handleActions } from 'redux-actions'
import { Record, List, Map } from 'immutable'
import { normalize, arrayOf } from 'normalizr'

import { request } from './app'
import roleSchema from 'schema/role'

const RoleState = new Record({
  result: new List(),
  entities: new Map()
})

const initialState = new RoleState()

export const SET_ROLE = 'SET_ROLE'
export const CLEAR_ROLE = 'CLEAR_ROLE'

export const setRole = createAction(SET_ROLE, (data) => normalize(data, arrayOf(roleSchema)))
export const clearRole = createAction(CLEAR_ROLE)

export const fetchRole = () => (dispatch) => {
  dispatch(request({
    url: 'roles'
  }, (entity) => {
    dispatch(setRole(entity))
  }))
}

export const actions = {
  setRole,
  clearRole,
  fetchRole
}

export default handleActions({
  [SET_ROLE]: (state, { payload }) => state.merge(payload),
  [CLEAR_ROLE]: () => new RoleState()
}, initialState)
