import {RequestStatus} from './const'

export const isRequesting = app => {
  const status = app.get('status')
  // Stop send request when pending.
  if (status === RequestStatus.PENDING) {
    return true
  }

  return false
}

export default isRequesting
