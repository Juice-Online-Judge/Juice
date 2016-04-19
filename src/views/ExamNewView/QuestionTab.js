import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import concat from 'lodash/concat';
import without from 'lodash/without';
import has from 'lodash/has';

import FlatButton from 'material-ui/FlatButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import { RequestStatus } from 'lib/const';
import ToggleDisplay from 'components/ToggleDisplay';
import ExamQuestion from 'components/ExamQuestion';
import Pagination from 'components/Pagination';
import LoadingContainer from 'components/LoadingContainer';

import { actions as questionActions } from 'redux/modules/question';

class QuestionTab extends Component {
  componentDidMount() {
    const { page } = this.state;
    this.props.fetchQuestion({ page }, { force: true });
  }

  @autobind
  handleRequestDetail(uuid) {
    this.setState({ detail: true, detailUuid: uuid });
  }

  @autobind
  handleBack() {
    this.setState({ detail: false, detailUuid: null });
  }

  @autobind
  handlePageChange(page) {
    this.props.fetchQuestion({ page });
    this.setState({ page });
  }

  @autobind
  handleQuestionChange(selectedQuestion, uuid) {
    const { questionDetail } = this.state;
    const newState = { selectedQuestion, questionDetail };
    if (!has(questionDetail, uuid)) {
      newState.questionDetail[uuid] = DEFAULT_DETAIL;
    }
    this.setState(newState);
  }

  render() {
    const { app, question, fetchQuestion } = this.props;
    const { selectedQuestion, detail } = this.state;
    const total = question.get('total');
    return (
      <div>
        <ToggleDisplay hide={ detail }>
          <LoadingContainer loading={ app.get('status') === RequestStatus.PENDING }>
            <ExamQuestionList
              app={ app }
              question={ question }
              fetchQuestion={ fetchQuestion }
              selectedQuestion={ selectedQuestion }
              onChange={ this.handleQuestionChange }
              onRequestDetail={ this.handleRequestDetail } />
            <Pagination
              current={ this.state.page }
              maxPage={ Math.ceil(total / 10) }
              onChange={ this.handlePageChange } />
          </LoadingContainer>
        </ToggleDisplay>
        <ToggleDisplay show={ detail }>
          <FlatButton label='Back' onTouchTap={ this.handleBack } icon={ <ChevronLeft /> } />
        </ToggleDisplay>
      </div>
    );
  }

  state = {
    page: 1,
    selectedQuestion: [],
    questionDetail: {},
    detailUuid: null,
    detail: false
  };

  static propTypes = {
    app: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    fetchQuestion: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ app: state.app, question: state.question }),
  questionActions)(QuestionTab);

class ExamQuestionList extends Component {
  @autobind
  handleQuestionCheck(selected, uuid) {
    const { selectedQuestion } = this.props;
    if (selected) {
      this.props.onChange(concat(selectedQuestion, uuid), uuid);
    } else {
      this.props.onChange(without(selectedQuestion, uuid), uuid);
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
    app: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    fetchQuestion: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onRequestDetail: PropTypes.func.isRequired,
    selectedQuestion: PropTypes.array.isRequired
  };
}

const DEFAULT_DETAIL = '{"score":100,"type":null}';
