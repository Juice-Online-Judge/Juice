import React, { Component, PropTypes } from 'react'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'
import { connect } from 'react-redux'

import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import CardActions from 'material-ui/Card/CardActions'
import Markdown from './Markdown'

import SubmitCode from './SubmitCode'

import { fetchQuestionDetail, questionSelector } from 'redux/modules/question'
import { fetchExamQuestion } from 'redux/modules/exam'

export class Question extends Component {
  componentDidMount() {
    this.fetchQuestionDetail()
  }

  fetchQuestionDetail() {
    const { question, uuid, examId } = this.props
    if (question && question.get('detail')) {
      return
    }

    if (examId) {
      // It an exam's question.
      this.props.fetchExamQuestion(examId)
    } else {
      this.props.fetchQuestionDetail(uuid, { force: true })
    }
  }

  render() {
    const { uuid, examId, question } = this.props

    return <QuestionCard uuid={ uuid } examId={ examId } question={ question } />
  }

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    examId: PropTypes.string,
    question: PropTypes.object.isRequired,
    fetchQuestionDetail: PropTypes.func.isRequired,
    fetchExamQuestion: PropTypes.func.isRequired
  };
}

export default connect(
  (state, props) => ({
    question: questionSelector(state, props)
  }),
  { fetchQuestionDetail, fetchExamQuestion }
)(Question)

export const QuestionCard = compose(
  setDisplayName('QuestionCard'),
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
