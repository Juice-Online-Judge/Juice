import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';
import api from 'lib/api';

let initialState = Immutable.fromJS({
  valid: false,
  state: false,
  user: {}
});

export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const CLEAR_USER = 'CLEAR_USER';

export const setLoginState = createAction(SET_LOGIN_STATE, (state = false) => state);
export const setUserInfo = createAction(SET_USER_INFO, (info) => info);
export const clearUser = createAction(CLEAR_USER);

export const login = (username, password) => {
  return (dispatch) => {
    let body = { username, password };
    api({
      path: 'auth/sign-in',
      entity: body
    })
    .then(() => {
      dispatch(fetchUserInfo({ force: true }));
    })
    .catch((error) => {
      console.warn(error);
      if (error instanceof Error) {
        throw error;
      }
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    api({
      path: 'auth/sign-out',
      method: 'get'
    })
    .then(() => {
      dispatch(clearUser());
    })
    .catch((error) => {
      console.warn(error);
      if (error instanceof Error) {
        throw error;
      }
    });
  };
};

export const fetchUserInfo = (options = { force: false }) => {
  const { force } = options;
  return (dispatch, getState) => {
    let { account } = getState();
    if (account.get('valid') && !force) {
      return;
    }
    api({
      path: 'account/profile'
    })
    .entity()
    .then((response) => {
      dispatch(setUserInfo(response));
    })
    .catch((error) => {
      dispatch(setLoginState(false));
      if (error instanceof Error) {
        throw error;
      }
    });
  };
};

export const registerUser = (info) => {
  return (dispatch) => {
    api({
      path: 'auth/sign-up',
      entity: info
    })
    .entity()
    .then(() => {
      dispatch(setUserInfo(info));
    })
    .catch((error) => {
      console.warn(error);
      if (error instanceof Error) {
        throw error;
      }
    });
  };
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
