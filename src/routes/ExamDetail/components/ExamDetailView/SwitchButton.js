import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import compose from 'recompose/compose'
import setPropTypes from 'recompose/setPropTypes'
import setDisplayName from 'recompose/setDisplayName'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import FlipToFrontIcon from 'material-ui/svg-icons/action/flip-to-front'
import styles from 'lib/styles'

const SwitchButton = compose(
  setPropTypes({
    examId: PropTypes.string.isRequired,
    func: PropTypes.string.isRequired
  }),
  setDisplayName('Filter')
)(({ examId, func }) => (
  <Link to={ `/exams/${examId}/${func}` }>
    <FloatingActionButton style={ styles.floatBtn }>
      <FlipToFrontIcon />
    </FloatingActionButton>
  </Link>
))

export default SwitchButton
