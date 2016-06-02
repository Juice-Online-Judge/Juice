import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

export const MessageState = new Record({
  open: false,
  message: ''
});

export const initialState = new MessageState();

export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_OPEN = 'SET_OPEN';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';

export const setMessage = createAction(SET_MESSAGE);
export const setOpen = createAction(SET_OPEN);
export const showMessage = createAction(SHOW_MESSAGE);

export function* doShowMessage({ payload }) {
  yield put(setMessage(payload));
  yield put(setOpen(true));
}

export function* watcher() {
  yield* takeEvery(SHOW_MESSAGE, doShowMessage);
}

export default handleActions({
  [SET_MESSAGE]: (state, { payload }) => state.set('message', payload),
  [SET_OPEN]: (state, { payload }) => state.set('open', payload)
}, initialState);
