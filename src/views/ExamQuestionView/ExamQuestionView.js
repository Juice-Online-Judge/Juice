import React, { PropTypes } from 'react'
import setPropTypes from 'recompose/setPropTypes'

import Inset from 'layouts/Inset'
import Question from 'components/Question'

const ExamQuestionView = setPropTypes({
  params: PropTypes.shape({
    examId: PropTypes.string,
    uuid: PropTypes.string.isRequired
  }).isRequired
})(({ params: { examId, uuid } }) => (
  <Inset>
    <Question
      examId={ examId }
      uuid={ uuid } />
  </Inset>
))

export default ExamQuestionView
