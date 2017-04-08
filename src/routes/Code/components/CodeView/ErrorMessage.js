import React from 'react'
import PropTypes from 'prop-types'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

import Prism from 'components/Prism'

const ErrorMessage = compose(
  setDisplayName('ErrorMessage'),
  setPropTypes({
    isFail: PropTypes.bool.isRequired,
    judgeMessage: PropTypes.string
  })
)(({isFail, judgeMessage}) => {
  return isFail
    ? <div>
      <div>Error message:</div>
      <Prism code={ judgeMessage } lang='txt' />
    </div>
    : null
})

export default ErrorMessage
