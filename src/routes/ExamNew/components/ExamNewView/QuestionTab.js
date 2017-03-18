import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'
import has from 'lodash/has'
import pick from 'lodash/pick'

import { RequestStatus } from 'lib/const'
import ToggleDisplay from 'components/ToggleDisplay'
import Pagination from 'components/Pagination'
import LoadingContainer from 'containers/LoadingContainer'
import ExamQuestionList from './ExamQuestionList'
import QuestionSetting from './QuestionSetting'

import { actions as questionActions } from 'redux/modules/question'

class QuestionTab extends Component {
  componentDidMount() {
    const { page } = this.state
    this.props.fetchQuestion({ page }, { force: true })
  }

  @bind handleRequestDetail(uuid) {
    this.setState({ detail: true, detailUuid: uuid })
  }

  @bind handleSettingChange(uuid, setting) {
    const { questionDetail } = this.state
    questionDetail[uuid] = setting
    this.setState({ questionDetail })
    this.emitChange(questionDetail, this.state.selectedQuestion)
  }

  @bind handleBack() {
    this.setState({ detail: false, detailUuid: null })
  }

  @bind handlePageChange(page) {
    this.props.fetchQuestion({ page })
    this.setState({ page })
  }

  @bind handleQuestionChange(selectedQuestion, uuid) {
    const { questionDetail } = this.state
    const newState = { selectedQuestion, questionDetail }
    if (!has(questionDetail, uuid)) {
      newState.questionDetail[uuid] = Object.assign({}, DEFAULT_DETAIL)
    }
    this.emitChange(newState.questionDetail, selectedQuestion)
    this.setState(newState)
  }

  emitChange(questionDetail, selectedQuestion) {
    this.props.onChange(pick(questionDetail, selectedQuestion))
  }

  render() {
    const { app, question } = this.props
    const { selectedQuestion, detail, detailUuid, questionDetail } = this.state
    const total = question.get('total')
    return (
      <div>
        <ToggleDisplay hide={ detail }>
          <LoadingContainer
            loading={ app.get('status') === RequestStatus.PENDING }>
            <ExamQuestionList
              question={ question }
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
            onBack={ this.handleBack }
            onChange={ this.handleSettingChange }
            setting={ detail ? questionDetail[detailUuid] : null }
            uuid={ detailUuid } />
        </ToggleDisplay>
      </div>
    )
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
    onChange: PropTypes.func.isRequired,
    fetchQuestion: PropTypes.func.isRequired
  };
}

export default connect(
  state => ({ app: state.app, question: state.question }),
  questionActions
)(QuestionTab)

const DEFAULT_DETAIL = {
  score: 100.0,
  readFrom: 'stdin',
  codeReview: false,
  type: null,
  goal: null,
  reward: null
}
