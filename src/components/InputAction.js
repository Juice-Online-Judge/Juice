import React, { PropTypes } from 'react'
import setPropTypes from 'recompose/setPropTypes'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'

import CardActions from 'material-ui/Card/CardActions'
import TextField from 'material-ui/TextField'

const InputAction = compose(
  setPropTypes({
    name: PropTypes.string.isRequired,
    message: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
  }),
  setDisplayName('InputAction')
)(({ message, label: floatingLabelText, ...rest }) => {
  const props = {
    floatingLabelText,
    ...rest
  }

  props.errorText = message && message.get(name)

  return (
    <CardActions>
      <TextField
        style={ styles.action }
        { ...props } />
    </CardActions>
  )
})

export default InputAction

const styles = {
  action: {
    width: '80%'
  }
}
