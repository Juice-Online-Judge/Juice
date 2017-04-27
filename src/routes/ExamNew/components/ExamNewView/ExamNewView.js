import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {Row, Col} from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardActions from 'material-ui/Card/CardActions'
import Inset from 'layouts/Inset'
import BasicInfoTab from './BasicInfoTab'
import QuestionTab from './QuestionTab'
import UserTab from './UserTab'
import MessageContainer from 'containers/MessageContainer'

import {addExam} from 'redux/modules/exam'
import {clearCache} from 'redux/modules/app'

export class ExamNewView extends Component {
  componentWillMount () {
    this.props.clearCache()
  }

  componentWillUnmount () {
    this.props.clearCache()
  }

  handleBasicInfoChange = data => {
    this.setData({...data})
  }

  handleQuestionChange = questions => {
    this.setData({questions})
  }

  handleUsersChange = users => {
    this.setData({users})
  }

  handleAddExam = () => {
    this.props.addExam(this.data)
  }

  setData (newData) {
    this.data = {...this.data, ...newData}
  }

  render () {
    return (
      <MessageContainer>
        <Inset>
          <Card>
            <CardTitle title='基本資訊' />
            <CardActions>
              <BasicInfoTab onChange={this.handleBasicInfoChange} />
            </CardActions>
          </Card>
          <Card>
            <CardTitle title='測驗問題' />
            <CardActions>
              <QuestionTab onChange={this.handleQuestionChange} />
            </CardActions>
          </Card>
          <Card>
            <CardTitle title='參加者' />
            <CardActions>
              <UserTab onChange={this.handleUsersChange} />
            </CardActions>
          </Card>
          <Card>
            <CardActions>
              <Row end='xs'>
                <Col md={2} sm={6}>
                  <RaisedButton
                    primary
                    label='Add'
                    onTouchTap={this.handleAddExam} />
                </Col>
              </Row>
            </CardActions>
          </Card>
        </Inset>
      </MessageContainer>
    )
  }

  state = {
    stepIndex: 0,
    finished: false
  }

  data = {}

  static propTypes = {
    addExam: PropTypes.func.isRequired,
    clearCache: PropTypes.func.isRequired
  }
}

export default connect(null, {addExam, clearCache})(ExamNewView)
