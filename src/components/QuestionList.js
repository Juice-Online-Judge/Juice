import React, { PropTypes } from 'react'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'
import QuestionLink from 'components/QuestionLink'

const QuestionList = compose(
  setPropTypes({
    question: PropTypes.object.isRequired,
    examId: PropTypes.string
  }),
  setDisplayName('QuestionList')
)(({ question, examId }) => (
  <div>
    {question
      .get('result')
      .map(uuid => (
        <QuestionLink
          key={ uuid }
          title={ question.getIn(['entities', 'question', uuid, 'title']) }
          examId={ examId }
          uuid={ uuid } />
      ))}
  </div>
))

export default QuestionList
