import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';
import when from 'when';
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

export const validateForm = (name, fields, rule) => (dispatch) => validate
  .async(fields, rule)
  .then(() => {
    dispatch(clearValidationMessage(name));
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.warn(error);
      throw error;
    } else {
      dispatch(setValidationMessage(name, error));
    }
    return when.reject();
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
