import React from 'react'
import PropTypes from 'prop-types'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

export const Label = compose(
  setDisplayName('Label'),
  setPropTypes({
    label: PropTypes.string,
    children: PropTypes.node,
    htmlFor: PropTypes.string.isRequired
  })
)(({label, htmlFor, children}) =>
  // eslint-disable-next-line
  <label style={styles.label} htmlFor={htmlFor}>
    {label || children}
  </label>
)

export default Label

const styles = {
  label: {
    marginBottom: '5px'
  }
}
