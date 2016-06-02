import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';
import compose from 'recompose/compose';

import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import Step from 'material-ui/Stepper/Step';
import Stepper from 'material-ui/Stepper/Stepper';
import StepLabel from 'material-ui/Stepper/StepLabel';
import { Row, Col } from 'react-flexbox-grid';

import redirectNotAdmin from 'lib/redirectNotAdmin';
import { addQuestion } from 'redux/modules/question';
import { clearStatus } from 'redux/modules/app';
import BasicInfoTab from './BasicInfoTab';
import AnswerTab from './AnswerTab';
import RestrictionTab from './RestrictionTab';
import Inset from 'layouts/Inset';
import MessageContainer from 'containers/MessageContainer';

class QuestionNewView extends Component {
  componentWillMount() {
    this.props.clearStatus();
  }

  @bind
  handleBasicInfoChange(data) {
    this.setData(data);
  }

  @bind
  handleAnswerChange(data) {
    this.setData(data);
  }

  @bind
  handleRestrictionChange(data) {
    this.setData(data);
  }

  setData(data) {
    this.data = { ...this.data, ...data };
  }

  @bind
  handleNext() {
    const { finished, stepIndex } = this.state;
    const nextStep = stepIndex + 1;
    if (finished) {
      this.handleAddQuestion();
    } else {
      this.setState({
        stepIndex: nextStep,
        finished: nextStep > 1
      });
    }
  }

  handleAddQuestion() {
    this.props.addQuestion(this.data);
  }

  stepContent(index) {
    if (index === 0) {
      return (
        <BasicInfoTab onChange={ this.handleBasicInfoChange } />
      );
    } else if (index === 1) {
      return (
        <AnswerTab onChange={ this.handleAnswerChange } />
      );
    } else if (index === 2) {
      return (
        <RestrictionTab onChange={ this.handleRestrictionChange } />
      );
    }
  }

  @bind
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { stepIndex, finished } = this.state;

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
                  <StepLabel>Set answer</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Set restriction</StepLabel>
                </Step>
              </Stepper>
            </CardActions>
            <CardActions>
              { this.stepContent(stepIndex) }
            </CardActions>
          </Card>
        </Inset>
      </MessageContainer>
    );
  }

  state = {
    stepIndex: 0,
    finished: false
  };

  data = {};

  static propTypes = {
    addQuestion: PropTypes.func.isRequired,
    clearStatus: PropTypes.func.isRequired
  };
}

export default compose(
  redirectNotAdmin,
  connect(null, { addQuestion, clearStatus })
)(QuestionNewView);
