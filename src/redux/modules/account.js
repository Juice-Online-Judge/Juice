import { createAction, handleActions } from 'redux-actions';
import { Record, Map } from 'immutable';
import store from 'store';
import guardRequest from '../utils/guardRequest';

const AccountState = new Record({
  valid: false,
  state: false,
  user: new Map()
});

const initialState = new AccountState();

export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const CLEAR_USER = 'CLEAR_USER';

export const setLoginState = createAction(SET_LOGIN_STATE, (state = false) => state);
export const setUserInfo = createAction(SET_USER_INFO, (info) => info);
export const clearUser = createAction(CLEAR_USER);

export const login = (username, password) => (dispatch) => {
  let body = { username, password };
  guardRequest(dispatch, {
    path: 'auth/sign-in',
    entity: body
  }, (entity) => {
    store.set('juice-token', entity);
    dispatch(fetchUserInfo({ force: true }));
  });
};

export const logout = () => (dispatch) => {
  guardRequest(dispatch, {
    path: 'auth/sign-out'
  }, () => {
    store.remove('juice-token');
    dispatch(clearUser());
  });
};

export const fetchUserInfo = (options = { force: false }) => (dispatch, getState) => {
  const { force } = options;
  let { account } = getState();
  if (account.get('valid') && !force) {
    return;
  }

  guardRequest(dispatch, {
    path: 'account/profile'
  }, (entity) => {
    dispatch(setUserInfo(entity));
  }, () => {
    dispatch(setLoginState(false));
  });
};

export const registerUser = (info) => (dispatch) => {
  guardRequest(dispatch, {
    path: 'auth/sign-up',
    entity: info
  }, () => {
    dispatch(setUserInfo(info));
  });
};

export let actions = {
  login,
  setLoginState,
  setUserInfo,
  fetchUserInfo,
  clearUser,
  registerUser,
  logout
};

export default handleActions({
  [SET_LOGIN_STATE]: (state, { payload }) => state.merge({valid: true, state: payload}),
  [SET_USER_INFO]: (state, { payload }) => {
    if (payload === {}) {
      return state.merge({valid: true, state: false});
    } else {
      return state.merge({valid: true, state: true, user: payload});
    }
  },
  [CLEAR_USER]: (state) => state.merge({valid: true, state: false, user: {}})
}, initialState);
