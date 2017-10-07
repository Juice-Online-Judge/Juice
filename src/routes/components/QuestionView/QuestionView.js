import React from 'react'
import PropTypes from 'prop-types'
import setPropTypes from 'recompose/setPropTypes'

import FlatButton from 'material-ui/FlatButton'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import Question from 'components/Question'
import Inset from 'layouts/Inset'

export const QuestionView = setPropTypes({
  match: PropTypes.shape({
    params: PropTypes.shape({
      examId: PropTypes.string,
      uuid: PropTypes.string.isRequired
    }).isRequired
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  })
})(({ match: { params: { examId, uuid } }, history: { goBack } }) => (
  <Inset>
    <FlatButton onClick={goBack} icon={<ChevronLeft />} label='Back to List' />
    <Question examId={examId} uuid={uuid} />
  </Inset>
))

export default QuestionView
