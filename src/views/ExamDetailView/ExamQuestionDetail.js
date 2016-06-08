import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import QuestionList from 'components/QuestionList'
import { fetchExamQuestion } from 'redux/modules/exam'

class ExamQuestionDetail extends Component {
  componentDidMount() {
    const { id } = this.props.params
    const { fetchExamQuestion } = this.props
    fetchExamQuestion(id)
  }

  render() {
    const { id } = this.props.params
    const { question } = this.props
    return (
      <QuestionList question={ question } examId={ id } />
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
