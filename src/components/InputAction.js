import React, {PropTypes} from 'react'
import setPropTypes from 'recompose/setPropTypes'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'

import CardActions from 'material-ui/Card/CardActions'
import TextField from 'material-ui/TextField'

const emptyMessage = {
  first() {}
}

const InputAction = compose(
  setPropTypes({
    name: PropTypes.string.isRequired,
    message: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
  }),
  setDisplayName('InputAction')
)(({message, name, label: floatingLabelText, ...rest}) => {
  const props = {
    floatingLabelText,
    name,
    ...rest
  }

  props.errorText = message && message.get(name, emptyMessage).first()

  return (
    <CardActions>
      <TextField style={ styles.action } { ...props } />
    </CardActions>
  )
})

export default InputAction

const styles = {
  action: {
    width: '80%'
  }
}
