import {RequestStatus} from 'lib/const'
import api from 'lib/api'
import {setStatus, clearError} from '../modules/app'
import handleRequestError from './handleRequestError'

const guardRequest = (dispatch, reqOpts, handleResult, handleError) => {
  dispatch(clearError())
  dispatch(setStatus(RequestStatus.PENDING))
  return api
    .request(reqOpts)
    .then(({data}) => {
      if (handleResult) {
        handleResult(data)
      }
      dispatch(setStatus(RequestStatus.SUCCESS))
      return true
    })
    .catch(error => {
      handleRequestError(dispatch, error)
      if (handleError) {
        throw handleError(error)
      }
      return false
    })
}

export default guardRequest
