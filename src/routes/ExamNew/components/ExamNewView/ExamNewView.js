import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'

import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardActions from 'material-ui/Card/CardActions'
import Inset from 'layouts/Inset'
import BasicInfoTab from './BasicInfoTab'
import QuestionTab from './QuestionTab'
import UserTab from './UserTab'
import redirectNotAdmin from 'lib/redirectNotAdmin'
import MessageContainer from 'containers/MessageContainer'

import {addExam} from 'redux/modules/exam'
import {clearCache} from 'redux/modules/app'

export class ExamNewView extends Component {
  componentWillMount() {
    this.props.clearCache()
  }

  componentWillUnmount() {
    this.props.clearCache()
  }

  handleBasicInfoChange = data => {
    this.setData({...data})
  };

  handleQuestionChange = questions => {
    this.setData({questions})
  };

  handleUsersChange = users => {
    this.setData({users})
  };

  handleAddExam() {
    this.props.addExam(this.data)
  }

  setData(newData) {
    this.data = {...this.data, ...newData}
  }

  render() {
    return (
      <MessageContainer>
        <Inset>
          <Card>
            <CardTitle title='基本資訊' />
            <CardActions>
              <BasicInfoTab onChange={ this.handleBasicInfoChange } />
            </CardActions>
          </Card>
          <Card>
            <CardTitle title='測驗問題' />
            <CardActions>
              <QuestionTab onChange={ this.handleQuestionChange } />
            </CardActions>
          </Card>
          <Card>
            <CardTitle title='參加者' />
            <CardActions>
              <UserTab onChange={ this.handleUsersChange } />
            </CardActions>
          </Card>
        </Inset>
      </MessageContainer>
    )
  }

  state = {
    stepIndex: 0,
    finished: false
  };

  data = {};

  static propTypes = {
    addExam: PropTypes.func.isRequired,
    clearCache: PropTypes.func.isRequired
  };
}

export default compose(redirectNotAdmin, connect(null, {addExam, clearCache}))(
  ExamNewView
)
