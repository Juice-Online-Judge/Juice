import React, { PropTypes } from 'react'
import setPropTypes from 'recompose/setPropTypes'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'

import CardActions from 'material-ui/Card/CardActions'
import TextField from 'material-ui/TextField'

const InputAction = compose(
  setPropTypes({
    name: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
  }),
  setDisplayName('InputAction')
)(({ name, message, onChange, onKeyDown, label, ...rest }) => (
  <CardActions>
    <TextField
      name={ name }
      style={ styles.action }
      onChange={ onChange }
      onKeyDown={ onKeyDown }
      errorText={ message.get(name) }
      floatingLabelText={ label }
      { ...rest } />
  </CardActions>
))

export default InputAction

const styles = {
  action: {
    width: '80%'
  }
}
