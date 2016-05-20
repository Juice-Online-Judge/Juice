import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import { Record, Map, List } from 'immutable';
import store from 'store';
import { createSelector } from 'reselect';
import { request } from './app';
import { showMessage } from './message';

export const AccountState = new Record({
  valid: false,
  state: false,
  user: new Map()
});

export const initialState = new AccountState();

export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const CLEAR_USER = 'CLEAR_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const REGISTER_USER = 'REGISTER_USER';

export const setLoginState = createAction(SET_LOGIN_STATE, (state = false) => state);
export const setUserInfo = createAction(SET_USER_INFO, (info) => info);
export const clearUser = createAction(CLEAR_USER);

// Async action creater
export const login = createAction(LOGIN, (username, password) => ({ username, password }));
export const logout = createAction(LOGOUT);
export const fetchUserInfo = createAction(FETCH_USER_INFO);
export const registerUser = createAction(REGISTER_USER);

export function* loginRequest({ payload }) {
  const body = payload;
  const { entity, error } = yield call(request, {
    path: 'auth/sign-in',
    entity: body
  });

  if (!error) {
    store.set('juice-token', entity);
    yield call(fetchUserInfoRequest, { force: true });
  } else {
    if (error instanceof Error) {
      throw error;
    }

    const { entity } = error;

    if (entity && entity.message) {
      yield put(showMessage(entity.message));
    }
  }
};

export function* logoutRequest() {
  const { error } = yield call(request, {
    path: 'auth/sign-out'
  });

  if (!error) {
    store.remove('juice-token');
    yield put(clearUser());
  }
};

export function* fetchUserInfoRequest(options = { force: false }) {
  const { force } = options;
  const { account } = yield select();
  if (account.get('valid') && !force) {
    return;
  }

  if (!store.has('juice-token')) {
    yield put(setLoginState(false));
    return;
  }

  const { entity, error } = yield call(request, {
    path: 'account/profile'
  });

  if (!error) {
    yield put(setUserInfo(entity));
  } else {
    // Token maybe expired here, remove it
    store.remove('juice-token');
    yield put(setLoginState(false));
  }
};

export function* registerUserRequest({ payload }) {
  const { entity, error } = yield call(request, {
    path: 'auth/sign-up',
    entity: payload
  });
  if (!error) {
    store.set('juice-token', entity);
    yield put(setUserInfo(payload));
  }
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

// Watcher
export function* watcher() {
  yield [
    takeEvery(LOGIN, loginRequest),
    takeEvery(FETCH_USER_INFO, fetchUserInfoRequest),
    takeEvery(LOGOUT, logoutRequest),
    takeEvery(REGISTER_USER, registerUserRequest)
  ];
}

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
