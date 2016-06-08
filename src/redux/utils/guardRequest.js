import { RequestStatus } from 'lib/const'
import api from 'lib/api'
import { setStatus } from '../modules/app'
import handleRequestError from './handleRequestError'

const guardRequest = (dispatch, reqOpts, handleResult, handleError) => {
  dispatch(setStatus(RequestStatus.PENDING))
  return api(reqOpts)
  .then(({ entity }) => {
    if (handleResult) {
      handleResult(entity)
    }
    dispatch(setStatus(RequestStatus.SUCCESS))
    return true
  })
  .catch((error) => {
    if (handleError) {
      handleError(error)
    }
    handleRequestError(dispatch, error)
    return false
  })
}

export default guardRequest
