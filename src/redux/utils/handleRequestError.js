import { put } from 'redux-saga/effects';
import { setError, setStatus } from '../modules/app';
import { RequestStatus } from 'lib/const';

export function* handleRequestError(error) {
  if (error instanceof Error) {
    throw error;
  } else {
    let { code, text } = error.status;
    let { messages } = error.entity;

    if (messages && !messages.length) {
      yield put(setError({ code, messages: [text] }));
    } else {
      yield put(setError({ code, messages }));
    }
  }
  yield put(setStatus(RequestStatus.FAIL));
};

export default handleRequestError;
