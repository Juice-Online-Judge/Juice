import { RequestStatus } from './const';

export const isRequesting = (app) => {
  const status = app.get('status');
  // Stop send request when pending or fail.
  if (status === RequestStatus.PENDING || status === RequestStatus.FAIL) {
    return true;
  }

  return false;
};

export default isRequesting;
