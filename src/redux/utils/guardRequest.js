import { RequestStatus } from 'lib/const';
import api from 'lib/api';
import { setStatus } from '../modules/app';
import handleRequestError from './handleRequestError';

const guardRequest = (dispatch, reqOpts, handleResult) => {
  dispatch(setStatus(RequestStatus.PENDING));
  api(reqOpts)
  .then(({ entity }) => {
    handleResult(entity);
    dispatch(RequestStatus.SUCCESS);
  })
  .catch(handleRequestError.bind(null, dispatch));
};

export default guardRequest;
