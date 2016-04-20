import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Inset from 'layouts/Inset';
import Question from 'components/Question';
import { actions as examActions } from 'redux/modules/exam';

class ExamQuestionListView extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    this.props.fetchExamQuestion(id);
  }

  render() {
    const { question } = this.props;
    return (
      <Inset>
        {
          question.get('result').map((uuid) => (
            <Question key={ uuid } uuid={ uuid } />
          ))
        }
      </Inset>
    );
  }

  static propTypes = {
    question: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchExamQuestion: PropTypes.func.isRequired
  }
}

export default connect((state) => ({ question: state.question }),
  examActions)(ExamQuestionListView);
