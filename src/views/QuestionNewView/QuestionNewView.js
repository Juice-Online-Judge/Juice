import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import SnackBar from 'material-ui/lib/snackbar';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { actions as questionActions } from 'redux/modules/question';
import { RequestStatus } from 'lib/const';
import { createFormDataDeep } from 'lib/utils';
import BasicInfoTab from './BasicInfoTab';
import AnswerTab from './AnswerTab';
import RestrictionTab from './RestrictionTab';

class QuestionNewView extends Component {
  componentWillMount() {
    this.props.clearStatus();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.question.get('status') === RequestStatus.SUCCESS) {
      this.setState({
        open: true,
        message: 'Add success'
      });
    } else if (newProps.question.get('status') === RequestStatus.FAIL) {
      this.setState({
        open: true,
        message: 'Add fail'
      });
    }
  }

  @autobind
  handleBasicInfoChange(data) {
    this.setState({ basicInfo: data });
  }

  @autobind
  handleAnswerChange(data) {
    this.setState({ answer: data });
  }

  @autobind
  handleRestrictionChange(data) {
    this.setState({ restriction: data });
  }

  @autobind
  handleAddQuestion() {
    const data = Object.assign(
      {},
      this.state.basicInfo,
      this.state.answer,
      this.state.restriction
    );
    this.props.addQuestion(createFormDataDeep(data));
  }

  @autobind
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Card>
          <CardActions>
            <Grid>
              <Row end='md'>
                <Col md={ 2 }>
                  <FlatButton label='Add' onTouchTap={ this.handleAddQuestion } />
                </Col>
              </Row>
            </Grid>
          </CardActions>
          <CardActions>
            <Tabs>
              <Tab label='Basic Info.'>
                <BasicInfoTab onChange={ this.handleBasicInfoChange } />
              </Tab>
              <Tab label='Answer'>
                <AnswerTab onChange={ this.handleAnswerChange } />
              </Tab>
              <Tab label='Restriction'>
                <RestrictionTab onChange={ this.handleRestrictionChange } />
              </Tab>
            </Tabs>
          </CardActions>
        </Card>
        <SnackBar
          open={ this.state.open }
          message={ this.state.message }
          autoHideDuration={ 2000 }
          onRequestClose={ this.handleClose }/>
      </div>
    );
  }

  state = {
    message: 'Add success',
    open: false
  };

  static propTypes = {
    question: PropTypes.object.isRequired,
    addQuestion: PropTypes.func.isRequired,
    clearStatus: PropTypes.func.isRequired
  };
}

export default connect((state) => {
  return { question: state.question };
}, questionActions)(QuestionNewView);
