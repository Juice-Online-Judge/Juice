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

export const setUsers = createAction(SET_USERS);

export const fetchUsers = () => {
  return (dispatch) => {
    guardRequest(dispatch, {
      path: 'users'
    }, (entity) => {
      const users = normalize(entity, arrayOf(userSchema));
      dispatch(setUsers(users));
    });
  };
};

export const actions = {
  setUsers,
  fetchUsers
};

export default handleActions({
  [SET_USERS]: (state, { payload }) => state.merge(payload)
}, initialState);
