import { setError, setStatus } from '../modules/app'
import { RequestStatus } from 'lib/const'

export const handleRequestError = (dispatch, error) => {
  if (error instanceof Error) {
    throw error
  } else {
    const { code, text } = error.status
    const { messages } = error.data

    if (messages && !messages.length) {
      dispatch(setError({ code, messages: [text] }))
    } else {
      dispatch(setError({ code, messages }))
    }
  }
  dispatch(setStatus(RequestStatus.FAIL))
}

export default handleRequestError
