import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import QuestionList from 'components/QuestionList'
import { fetchExamQuestion } from 'redux/modules/exam'

class ExamQuestionDetail extends Component {
  componentDidMount() {
    const { examId } = this.props.params
    const { fetchExamQuestion } = this.props
    fetchExamQuestion(examId)
  }

  render() {
    const { examId } = this.props.params
    const { question } = this.props
    return (
      <QuestionList question={ question } examId={ examId } />
    )
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    fetchExamQuestion: PropTypes.func.isRequired
  };
}

export default connect((state) => ({
  question: state.question
}), { fetchExamQuestion })(ExamQuestionDetail)
