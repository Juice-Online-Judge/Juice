import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import QuestionList from 'components/QuestionList'
import {fetchExamQuestion} from 'redux/modules/exam'

class ExamQuestionDetail extends Component {
  componentDidMount () {
    const {examId} = this.props
    const {fetchExamQuestion} = this.props
    fetchExamQuestion(examId)
  }

  render () {
    const {examId, question} = this.props
    return <QuestionList question={question} examId={examId} />
  }

  static propTypes = {
    examId: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    fetchExamQuestion: PropTypes.func.isRequired
  }
}

export default connect(
  ({question}, {match: {params: {examId}}}) => ({
    question,
    examId
  }),
  {fetchExamQuestion}
)(ExamQuestionDetail)
