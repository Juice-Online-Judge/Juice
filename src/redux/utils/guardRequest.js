import { put, call } from 'redux-saga/effects';
import { RequestStatus } from 'lib/const';
import api from 'lib/api';
import { setStatus } from '../modules/app';
import handleRequestError from './handleRequestError';

function* guardRequest(reqOpts) {
  var result;
  yield put(setStatus(RequestStatus.PENDING));
  try {
    const { entity } = yield call(api, reqOpts);
    result = { entity };
  } catch (error) {
    result = false;
    yield* handleRequestError(error);
    result = { error };
  }
  return result;
};

export default guardRequest;
