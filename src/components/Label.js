import React, {PropTypes} from 'react'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

export const Label = compose(
  setDisplayName('Label'),
  setPropTypes({
    label: PropTypes.string,
    children: PropTypes.node
  })
)(({label, children}) => (
  <label style={ styles.label }>
    {label || children}
  </label>
))

export default Label

const styles = {
  label: {
    marginBottom: '5px'
  }
}
