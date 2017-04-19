import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import CardActions from 'material-ui/Card/CardActions'
import Markdown from './Markdown'

import SubmitCode from './SubmitCode'

import { fetchQuestionDetail, questionSelector } from 'redux/modules/question'
import { fetchExamQuestion } from 'redux/modules/exam'

export const Question = compose(
  setDisplayName('Question'),
  setPropTypes({
    uuid: PropTypes.string.isRequired,
    examId: PropTypes.string,
    question: PropTypes.object.isRequired
  })
)(({ uuid, examId, question }) => (
  <Card>
    <CardTitle title={ question.get('title') } subtitle={ `uuid: ${uuid}` } />
    <CardText>
      <div>
        Time limit: {question.getIn(['judge', 'restriction', 'time'])} s
      </div>
      <div>
        Memory limit: {question.getIn(['judge', 'restriction', 'memory'])} MB
      </div>
      <div>
        File limit: {question.getIn(['judge', 'restriction', 'file'])}
      </div>
    </CardText>
    <CardText>
      <Markdown source={ question.get('description', '') } />
    </CardText>
    <CardActions>
      <SubmitCode examId={ examId } uuid={ uuid } />
    </CardActions>
  </Card>
))

export default connect(
  (state, props) => ({
    question: questionSelector(state, props)
  }),
  { fetchQuestionDetail, fetchExamQuestion },
  (state, { fetchExamQuestion, fetchQuestionDetail }, props) => {
    const { uuid, examId } = props
    const { question } = state
    const mergedProps = { ...props, ...state }
    if (question && question.get('detail')) {
      return mergedProps
    }

    if (examId) {
      // It an exam's question.
      fetchExamQuestion(examId)
    } else {
      fetchQuestionDetail(uuid, { force: true })
    }
    return mergedProps
  }
)(Question)
