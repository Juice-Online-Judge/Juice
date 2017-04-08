import React, {PropTypes} from 'react'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'
import styles from 'lib/styles'

export const ToggleDisplay = compose(
  setPropTypes({
    show: PropTypes.bool,
    hide: PropTypes.bool,
    children: PropTypes.node
  }),
  setDisplayName('ToggleDisplay')
)(({show, hide, children}) => {
  const style = (show || !hide) && show !== false ? styles.none : styles.hidden
  return (
    <div style={ style }>
      {children}
    </div>
  )
})

export default ToggleDisplay
