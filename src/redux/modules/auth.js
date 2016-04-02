import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';
import api from 'lib/api';

let initialState = Immutable.fromJS({
  valid: false,
  state: false,
  user: {},
  errorMessage: null
});

export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_USER = 'CLEAR_USER';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const setLoginState = createAction(SET_LOGIN_STATE, (state = false) => state);
export const setUserInfo = createAction(SET_USER_INFO, (info) => info);
export const setError = createAction(SET_ERROR, (msg) => msg);
export const clearUser = createAction(CLEAR_USER);
export const clearError = createAction(CLEAR_ERROR);

export const login = (username, password) => {
  return (dispatch) => {
    let body = { username, password };
    api({
      path: 'auth/sign-in',
      entity: body
    }).entity()
      .then(() => {
        dispatch(fetchUserInfo());
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
    }).entity()
      .then((response) => {
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

export const fetchUserInfo = () => {
  return (dispatch, getState) => {
    let { auth } = getState();
    if (auth.get('valid')) {
      return;
    }
    api({
      path: 'users/profile'
    }).entity()
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
    }).entity()
      .then((response) => {
        dispatch(setUserInfo(info));
      })
      .catch((error) => {
        console.warn(error);
        if (error instanceof Error) {
          throw error;
        } else {
          dispatch(setError(error.message));
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
  clearError,
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
  [SET_ERROR]: (state, { payload }) => state.merge({errorMessage: payload}),
  [CLEAR_USER]: (state) => state.merge({valid: true, state: false, user: {}}),
  [CLEAR_ERROR]: (state) => state.merge({errorMessage: null})
}, initialState);
