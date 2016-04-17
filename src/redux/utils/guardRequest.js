import { RequestStatus } from 'lib/const';
import api from 'lib/api';
import { setStatus } from '../modules/app';
import handleRequestError from './handleRequestError';

const guardRequest = (dispatch, reqOpts, handleResult, handleError) => {
  dispatch(setStatus(RequestStatus.PENDING));
  api(reqOpts)
  .then(({ entity }) => {
    handleResult(entity);
    dispatch(setStatus(RequestStatus.SUCCESS));
  })
  .catch((error) => {
    if (handleError) {
      handleError(error);
    }
    handleRequestError(dispatch, error);
  });
};

export default guardRequest;
