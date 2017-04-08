import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bind} from 'decko'
import compose from 'recompose/compose'

import RaisedButton from 'material-ui/RaisedButton'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardActions from 'material-ui/Card/CardActions'
import {Row, Col} from 'react-flexbox-grid'

import redirectNotAdmin from 'lib/redirectNotAdmin'
import {addQuestion} from 'redux/modules/question'
import {clearStatus} from 'redux/modules/app'
import BasicInfoTab from './BasicInfoTab'
import AnswerTab from './AnswerTab'
import RestrictionTab from './RestrictionTab'
import Inset from 'layouts/Inset'
import MessageContainer from 'containers/MessageContainer'

class QuestionNewView extends Component {
  componentWillMount() {
    this.props.clearStatus()
  }

  @bind handleBasicInfoChange(data) {
    this.setData(data)
  }

  @bind handleAnswerChange(data) {
    this.setData(data)
  }

  @bind handleRestrictionChange(data) {
    this.setData(data)
  }

  setData(data) {
    this.data = {...this.data, ...data}
  }

  @bind handleAddQuestion() {
    this.props.addQuestion(this.data)
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
            <CardTitle title='答案' />
            <CardActions>
              <AnswerTab onChange={ this.handleAnswerChange } />
            </CardActions>
          </Card>
          <Card>
            <CardTitle title='題目限制' />
            <CardActions>
              <RestrictionTab onChange={ this.handleRestrictionChange } />
            </CardActions>
            <CardActions>
              <Row end='xs'>
                <Col md={ 2 } sm={ 6 }>
                  <RaisedButton
                    primary
                    label='Add'
                    onTouchTap={ this.handleAddQuestion } />
                </Col>
              </Row>
            </CardActions>
          </Card>
        </Inset>
      </MessageContainer>
    )
  }

  data = {};

  static propTypes = {
    addQuestion: PropTypes.func.isRequired,
    clearStatus: PropTypes.func.isRequired
  };
}

export default compose(
  redirectNotAdmin,
  connect(null, {addQuestion, clearStatus})
)(QuestionNewView)
