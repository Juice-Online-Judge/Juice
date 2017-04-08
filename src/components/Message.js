import React, {PropTypes} from 'react'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'
import Snackbar from 'material-ui/Snackbar'

const Message = compose(
  setPropTypes({
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired
  }),
  setDisplayName('Message')
)(({open, message, onRequestClose}) => (
  <Snackbar
    open={ open }
    message={ message }
    autoHideDuration={ 2000 }
    onRequestClose={ onRequestClose } />
))

export default Message
