import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';
import validate from 'validate.js';

const initialState = fromJS({
  message: {}
});

export const SET_VALIDATION_MESSAGE = 'SET_VALIDATION_MESSAGE';
export const CLEAR_VALIDATION_MESSAGE = 'CLEAR_VALIDATION_MESSAGE';

export const setValidationMessage = createAction(SET_VALIDATION_MESSAGE, (name, error) => {
  const payload = {};
  payload[name] = error;
  return payload;
});
export const clearValidationMessage = createAction(CLEAR_VALIDATION_MESSAGE);

export const validateForm = (name, fields, rule, cb) => (dispatch) => validate
  .async(fields, rule)
  .then(() => {
    dispatch(clearValidationMessage(name));
    cb(true);
    return true;
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.warn(error);
      throw error;
    } else {
      dispatch(setValidationMessage(name, error));
    }
    cb(false);
    return false;
  });

export const createGetComponentMessage = (name) => (state) => ({
  validation: state.validate.getIn(['message', name], new Map())
});

export const actions = {
  setValidationMessage,
  clearValidationMessage,
  validateForm
};

export default handleActions({
  [SET_VALIDATION_MESSAGE]: (state, { payload }) => state.mergeIn(['message'], payload),
  [CLEAR_VALIDATION_MESSAGE]: (state, { payload }) => state.setIn(['message', payload], new Map())
}, initialState);
