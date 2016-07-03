import React, { PropTypes } from 'react'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

import CodePane from 'components/CodePane'

const ErrorMessage = compose(
  setDisplayName('ErrorMessage'),
  setPropTypes({
    submission: PropTypes.object.isRequired
  })
)(({ submission }) => {
  const isFail = submission.getIn(['judge', 'result'], 'AC') !== 'AC'
  if (!isFail) {
    return null
  }

  const judgeMessage = submission.getIn(['judge', 'judge_message'])

  return (
    <div>
      <div>Error message:</div>
      <CodePane code={ judgeMessage } lang='txt' />
    </div>
  )
})

export default ErrorMessage
