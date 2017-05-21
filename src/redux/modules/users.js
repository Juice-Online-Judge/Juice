import {createAction, handleActions} from 'redux-actions'
import {Record, List, Map} from 'immutable'
import {normalize} from 'normalizr'
import userSchema from 'schema/user'

import {request, CLEAR_CACHE} from './app'

const UsersState = new Record({
  result: new List(),
  entities: new Map()
})

const initialState = new UsersState()

const SET_USERS = 'SET_USERS'

export const setUsers = createAction(SET_USERS, data =>
  normalize(data, [userSchema])
)
export const fetchUsers = () => dispatch => {
  dispatch(
    request(
      {
        url: 'users'
      },
      ({users}) => {
        dispatch(setUsers(users))
      }
    )
  )
}

export const actions = {
  setUsers,
  fetchUsers
}

export default handleActions(
  {
    [SET_USERS]: (state, {payload}) => state.merge(payload),
    [CLEAR_CACHE]: () => new UsersState()
  },
  initialState
)
