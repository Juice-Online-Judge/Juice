import { createAction, handleActions } from 'redux-actions';
import { Record, List, Map } from 'immutable';
import { normalize, arrayOf } from 'normalizr';
import userSchema from 'schema/user';

import guardRequest from '../utils/guardRequest';

const UsersState = new Record({
  result: new List(),
  entities: new Map()
});

const initialState = new UsersState();

const SET_USERS = 'SET_USERS';
const CLEAR_USERS = 'CLEAR_USERS';

export const setUsers = createAction(SET_USERS, (data) => normalize(data, arrayOf(userSchema)));
export const clearUsers = createAction(CLEAR_USERS);

export const fetchUsers = () => {
  return (dispatch) => {
    guardRequest(dispatch, {
      path: 'users'
    }, (entity) => {
      dispatch(setUsers(entity));
    });
  };
};

export const actions = {
  setUsers,
  fetchUsers
};

export default handleActions({
  [SET_USERS]: (state, { payload }) => state.merge(payload),
  [CLEAR_USERS]: () => new UsersState()
}, initialState);
