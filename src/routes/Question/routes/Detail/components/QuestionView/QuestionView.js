import React, { PropTypes } from 'react'
import setPropTypes from 'recompose/setPropTypes'

import Question from 'components/Question'
import Inset from 'layouts/Inset'

import redirectNotFound from 'lib/redirectNotFound'

export const QuestionView = setPropTypes({
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

export default redirectNotFound(QuestionView)
