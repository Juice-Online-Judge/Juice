import { RequestStatus } from 'lib/const';
import api from 'lib/api';
import { setStatus } from '../modules/app';
import handleRequestError from './handleRequestError';

const guardRequest = (dispatch, reqOpts, handleResult, handleError, opts) => {
  dispatch(setStatus(RequestStatus.PENDING));
  api(reqOpts)
  .then(({ entity }) => {
    if (handleResult) {
      handleResult(entity);
    }
    dispatch(setStatus(RequestStatus.SUCCESS));
  })
  .catch((error) => {
    if (handleError) {
      handleError(error);
    }
    if (!opts || !opts.noError) {
      handleRequestError(dispatch, error);
    }
  });
};

export default guardRequest;
