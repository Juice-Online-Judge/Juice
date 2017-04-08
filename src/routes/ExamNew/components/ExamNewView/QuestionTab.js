import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import pick from 'lodash/pick'

import {RequestStatus} from 'lib/const'
import ToggleDisplay from 'components/ToggleDisplay'
import Pagination from 'components/Pagination'
import LoadingContainer from 'containers/LoadingContainer'
import ExamQuestionList from './ExamQuestionList'
import QuestionSetting from './QuestionSetting'

import {fetchQuestion} from 'redux/modules/question'

class QuestionTab extends Component {
  componentDidMount() {
    const {page} = this.state
    this.props.fetchQuestion({page}, {force: true})
  }

  handleRequestDetail = uuid => {
    this.setState({detail: true, detailUuid: uuid})
  };

  handleSettingChange = (uuid, setting) => {
    const {questionDetail, selectedQuestion} = this.state
    questionDetail[uuid] = setting
    this.setState({questionDetail})
    this.emitChange(questionDetail, selectedQuestion)
  };

  handleBack = () => {
    this.setState({detail: false, detailUuid: null})
  };

  handlePageChange = page => {
    this.props.fetchQuestion({page})
    this.setState({page})
  };

  handleQuestionChange = (selectedQuestion, uuid) => {
    this.setState(({questionDetail}) => {
      const state = {
        questionDetail: {
          [uuid]: {...DEFAULT_DETAIL},
          ...questionDetail
        },
        selectedQuestion
      }
      this.emitChange(state.questionDetail, selectedQuestion)
      return state
    })
  };

  emitChange(questionDetail, selectedQuestion) {
    this.props.onChange(pick(questionDetail, selectedQuestion))
  }

  render() {
    const {app, question} = this.props
    const {selectedQuestion, detail, detailUuid, questionDetail} = this.state
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

export default connect(state => ({app: state.app, question: state.question}), {
  fetchQuestion
})(QuestionTab)

const DEFAULT_DETAIL = {
  score: 100.0,
  readFrom: 'stdin',
  codeReview: false,
  type: null,
  goal: null,
  reward: null
}
