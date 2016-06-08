import { createAction, handleActions } from 'redux-actions'
import { Record } from 'immutable'

export const MessageState = new Record({
  open: false,
  message: ''
})

export const initialState = new MessageState()

export const SET_MESSAGE = 'SET_MESSAGE'
export const SET_OPEN = 'SET_OPEN'

export const setMessage = createAction(SET_MESSAGE)
export const setOpen = createAction(SET_OPEN)

export const showMessage = (msg) => (dispatch) => {
  dispatch(setMessage(msg))
  dispatch(setOpen(true))
}

export default handleActions({
  [SET_MESSAGE]: (state, { payload }) => state.set('message', payload),
  [SET_OPEN]: (state, { payload }) => state.set('open', payload)
}, initialState)
