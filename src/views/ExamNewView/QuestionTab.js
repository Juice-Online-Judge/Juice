import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import concat from 'lodash/concat';
import without from 'lodash/without';

import ExamQuestion from 'components/ExamQuestion';

import { actions as questionActions } from 'redux/modules/question';

class QuestionTab extends Component {
  componentDidMount() {
    const { page } = this.state;
    this.props.fetchQuestion({ page }, { force: true });
  }

  @autobind
  handleRequestDetail(uuid) {
  }

  @autobind
  handleQuestionChange(selectedQuestion) {
    this.setState({ selectedQuestion });
  }

  render() {
    const { question, fetchQuestion } = this.props;
    const { selectedQuestion } = this.state;
    return (
      <div>
        <ExamQuestionList
          question={ question }
          fetchQuestion={ fetchQuestion }
          selectedQuestion={ selectedQuestion }
          onChange={ this.handleQuestionChange }
          onRequestDetail={ this.handleRequestDetail } />
      </div>
    );
  }

  state = {
    page: 1,
    selectedQuestion: [],
    questionDetail: {}
  };

  static propTypes = {
    question: PropTypes.object.isRequired,
    fetchQuestion: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ question: state.question }),
  questionActions)(QuestionTab);

class ExamQuestionList extends Component {
  @autobind
  handleQuestionCheck(selected, uuid) {
    const { selectedQuestion } = this.props;
    if (selected) {
      this.props.onChange(concat(selectedQuestion, uuid));
    } else {
      this.props.onChange(without(selectedQuestion, uuid));
    }
  }

  @autobind
  handleRequestDetail(uuid) {
    this.props.onRequestDetail(uuid);
  }

  render() {
    const { question, selectedQuestion } = this.props;
    return (
      <div>
        {
          question.get('result').map((uuid) => {
            return (
              <ExamQuestion
                key={ uuid }
                uuid={ uuid }
                checked={ selectedQuestion.indexOf(uuid) !== -1 }
                onCheck={ this.handleQuestionCheck }
                onRequestDetail={ this.handleRequestDetail } />
            );
          })
        }
      </div>
    );
  }

  static propTypes = {
    question: PropTypes.object.isRequired,
    fetchQuestion: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onRequestDetail: PropTypes.func.isRequired,
    selectedQuestion: PropTypes.array.isRequired
  };
}
