import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'
import compose from 'recompose/compose'

import { Row, Col } from 'react-flexbox-grid'
import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import RaisedButton from 'material-ui/RaisedButton'
import Step from 'material-ui/Stepper/Step'
import Stepper from 'material-ui/Stepper/Stepper'
import StepLabel from 'material-ui/Stepper/StepLabel'
import Inset from 'layouts/Inset'
import BasicInfoTab from './BasicInfoTab'
import QuestionTab from './QuestionTab'
import UserTab from './UserTab'
import redirectNotAdmin from 'lib/redirectNotAdmin'
import MessageContainer from 'containers/MessageContainer'

import { addExam } from 'redux/modules/exam'
import { clearCache } from 'redux/modules/app'

export class ExamNewView extends Component {
  componentWillMount() {
    this.props.clearCache()
  }

  componentWillUnmount() {
    this.props.clearCache()
  }

  @bind handleBasicInfoChange(data) {
    this.setData({ ...data })
  }

  @bind handleQuestionChange(questions) {
    this.setData({ questions })
  }

  @bind handleUsersChange(users) {
    this.setData({ users })
  }

  @bind handleNext() {
    const { finished, stepIndex } = this.state
    const nextStep = stepIndex + 1
    if (finished) {
      this.handleAddExam()
    } else {
      this.setState({
        stepIndex: nextStep,
        finished: nextStep > 1
      })
    }
  }

  handleAddExam() {
    this.props.addExam(this.data)
  }

  stepContent(index) {
    if (index === 0) {
      return <BasicInfoTab onChange={ this.handleBasicInfoChange } />
    } else if (index === 1) {
      return <QuestionTab onChange={ this.handleQuestionChange } />
    } else if (index === 2) {
      return <UserTab onChange={ this.handleUsersChange } />
    }
  }

  setData(newData) {
    this.data = { ...this.data, ...newData }
  }

  render() {
    const { stepIndex, finished } = this.state
    return (
      <MessageContainer>
        <Inset>
          <Card>
            <CardActions>
              <Row end='xs'>
                <Col md={ 2 } sm={ 6 }>
                  <RaisedButton
                    primary
                    label={ finished ? 'Add' : 'Next' }
                    onTouchTap={ this.handleNext } />
                </Col>
              </Row>
            </CardActions>
            <CardActions>
              <Stepper activeStep={ stepIndex }>
                <Step>
                  <StepLabel>Set basic info.</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Add questions</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Add users</StepLabel>
                </Step>
              </Stepper>
            </CardActions>
            <CardActions>
              {this.stepContent(stepIndex)}
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

export default compose(
  redirectNotAdmin,
  connect(null, { addExam, clearCache })
)(ExamNewView)
