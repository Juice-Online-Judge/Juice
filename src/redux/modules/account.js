import { createAction, handleActions } from 'redux-actions';
import { Record, Map, List } from 'immutable';
import store from 'store';
import { createSelector } from 'reselect';
import { request } from './app';
import { showMessage } from './message';
import { validateForm } from './validation';

export const AccountState = new Record({
  valid: false,
  state: false,
  user: new Map()
});

export const initialState = new AccountState();

export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const CLEAR_USER = 'CLEAR_USER';

export const setLoginState = createAction(SET_LOGIN_STATE, (state = false) => state);
export const setUserInfo = createAction(SET_USER_INFO);
export const clearUser = createAction(CLEAR_USER);

export const login = (username, password) => (dispatch) => {
  let body = { username, password };
  return dispatch(request({
    path: 'auth/sign-in',
    entity: body
  }, (entity) => {
    store.set('juice-token', entity);
    dispatch(fetchUserInfo({ force: true }));
  }, (error) => {
    if (error instanceof Error) {
      throw error;
    }

    const { entity } = error;

    if (entity && entity.message) {
      dispatch(showMessage(entity.message));
    }
  }));
};

export const logout = () => (dispatch) => {
  dispatch(request({
    path: 'auth/sign-out'
  }, () => {
    store.remove('juice-token');
    dispatch(clearUser());
  }));
};

export const fetchUserInfo = (options = { force: false }) => (dispatch, getState) => {
  const { force } = options;
  let { account } = getState();
  if (account.get('valid') && !force) {
    return;
  }

  if (!store.has('juice-token')) {
    dispatch(setLoginState(false));
    return;
  }

  dispatch(request({
    path: 'account/profile'
  }, (entity) => {
    dispatch(setUserInfo(entity.user));
  }, () => {
    // Token maybe expired here, remove it
    store.remove('juice-token');
    dispatch(setLoginState(false));
  }));
};

export const registerUser = (info) => (dispatch) => {
  const isValidation = dispatch(validateForm(info));

  if (!isValidation) {
    return;
  }

  return dispatch(request({
    path: 'auth/sign-up',
    entity: info
  }, (entity) => {
    store.set('juice-token', entity);
    dispatch(setUserInfo(info));
  }));
};

// Selectors

export const isValidSelector = (state) => state.account.get('valid');
const accountRoleSelector = (state) => state.account.getIn(['user', 'roles'], new List());
const accountStateSelector = (state) => state.account.get('state');

export const createIsAdminSelector = () => createSelector(
  [accountRoleSelector, isValidSelector],
  (roles, valid) => valid && roles.includes('admin')
);

export const isNotAdminSelector = createSelector(
  [accountRoleSelector, isValidSelector],
  (roles, valid) => valid && !roles.includes('admin')
);

export const isLoginSelector = createSelector(
  [accountStateSelector, isValidSelector],
  (state, valid) => valid && state
);

// Helper function

export const isLogin = (account) => {
  return account.get('state') || store.has('juice-token');
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
  [SET_LOGIN_STATE]: (state, { payload }) => state.merge({ valid: true, state: payload }),
  [SET_USER_INFO]: (state, { payload }) => state.merge({ valid: true, state: true, user: payload }),
  [CLEAR_USER]: (state) => state.merge({ valid: true, state: false, user: {} })
}, initialState);
