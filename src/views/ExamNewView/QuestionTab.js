import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import concat from 'lodash/concat';
import without from 'lodash/without';
import has from 'lodash/has';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
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
    const { selectedQuestion, detail, detailUuid, questionDetail } = this.state;
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
          <QuestionSetting
            detail={ detail }
            question={ question }
            handleBack={ this.handleBack }
            setting={ detail ? JSON.parse(questionDetail[detailUuid]) : null }
            uuid={ detailUuid } />
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

class QuestionSetting extends Component {
  componentDidMount() {
    this.settingToState(this.props.setting);
  }

  componentWillReceiveProps(newProps) {
    this.settingToState(newProps.setting);
  }

  settingToState(setting) {
    if (setting) {
      this.setState({ setting });
    }
  }

  @autobind
  handleScoreChange(event) {
    this.setState({ score: event.target.value });
  }

  render() {
    const { detail, question, uuid } = this.props;
    const { score } = this.state;

    if (!detail) {
      return null;
    }

    return (
      <div>
        <Card>
          <CardTitle>
            <FlatButton label='Back' onTouchTap={ this.props.handleBack } icon={ <ChevronLeft /> } />
            <span> Setting "{ question.getIn(['entities', 'question', uuid, 'title']) }" </span>
          </CardTitle>
          <CardActions>
            <TextField
              floatingLabelText='Score'
              onChange={ this.handleScoreChange }
              value={ score } />
          </CardActions>
        </Card>
      </div>
    );
  }

  state = {
    score: 100
  };

  static propTypes = {
    question: PropTypes.object.isRequired,
    handleBack: PropTypes.func.isRequired,
    detail: PropTypes.bool.isRequired,
    setting: PropTypes.object,
    uuid: PropTypes.string
  };
}

const DEFAULT_DETAIL = '{"score":100,"type":null}';
