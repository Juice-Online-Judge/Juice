import React, { PropTypes } from 'react'
import setPropTypes from 'recompose/setPropTypes'

import Question from 'components/Question'
import Inset from 'layouts/Inset'

import redirectNotFound from 'lib/redirectNotFound'

export const QuestionView = setPropTypes({
  params: PropTypes.shape({
    uuid: PropTypes.string.isRequired
  }).isRequired
})(({ params: { uuid } }) => (
  <Inset>
    <Question uuid={ uuid } />
  </Inset>
))

export default redirectNotFound(QuestionView)
