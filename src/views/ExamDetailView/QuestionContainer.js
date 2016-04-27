import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import { fetchExamQuestion } from 'redux/modules/exam';

class QuestionContainer extends Component {
  componentDidMount() {
    const { examId, fetchExamQuestion } = this.props;
    fetchExamQuestion(examId);
  }

  render() {
    const { examId, question } = this.props;
    return (
      <QuestionList question={ question } examId={ examId } />
    );
  }

  static propTypes = {
    examId: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired,
    fetchExamQuestion: PropTypes.func.isRequired
  };
}

export default connect((state) => ({
  question: state.question
}), { fetchExamQuestion })(QuestionContainer);
