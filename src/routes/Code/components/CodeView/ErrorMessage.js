import React, { PropTypes } from 'react'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

import CodePane from 'components/CodePane'

const ErrorMessage = compose(
  setDisplayName('ErrorMessage'),
  setPropTypes({
    isFail: PropTypes.bool.isRequired,
    judgeMessage: PropTypes.string
  })
)(({ isFail, judgeMessage }) => {
  return isFail ? null : (
    <div>
      <div>Error message:</div>
      <CodePane code={ judgeMessage } lang='txt' />
    </div>
  )
})

export default ErrorMessage
