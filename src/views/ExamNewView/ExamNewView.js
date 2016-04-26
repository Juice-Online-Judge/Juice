import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { Row, Col } from 'react-flexbox-grid';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from 'material-ui/FlatButton';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import Inset from 'layouts/Inset';
import BasicInfoTab from './BasicInfoTab';
import QuestionTab from './QuestionTab';
import UserTab from './UserTab';
import redirectNotAdmin from 'lib/redirectNotAdmin';
import compose from 'recompose/compose';
import Message from 'components/Message';
import { RequestStatus } from 'lib/const';

import { actions as examActions } from 'redux/modules/exam';
import { clearCache, clearStatus } from 'redux/modules/app';

export class ExamNewView extends Component {
  componentWillMount() {
    this.props.clearCache();
    this.props.clearStatus();
  }

  componentWillUnmount() {
    this.props.clearCache();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.status === RequestStatus.SUCCESS) {
      this.setState({ open: true, message: 'Add success' });
    } else if (newProps.status === RequestStatus.FAIL) {
      this.setState({ open: true, message: 'Add fail' });
    }
    this.props.clearStatus();
  }

  @autobind
  handleBasicInfoChange(data) {
    this.setData({ ...data });
  }

  @autobind
  handleQuestionChange(questions) {
    this.setData({ questions });
  }

  @autobind
  handleUsersChange(users) {
    this.setData({ users });
  }

  @autobind
  handleAddExam() {
    this.props.addExam(this.data);
  }

  setData(newData) {
    this.data = { ...this.data, ...newData };
  }

  render() {
    return (
      <div>
        <Inset>
          <Card>
            <CardActions>
              <Row end='xs'>
                <Col md={ 2 } sm={ 6 }>
                  <FlatButton label='Add' onTouchTap={ this.handleAddExam } />
                </Col>
              </Row>
            </CardActions>
            <CardActions>
              <Tabs>
                <Tab label='Basic Info.'>
                  <BasicInfoTab onChange={ this.handleBasicInfoChange } />
                </Tab>
                <Tab label='Questions'>
                  <QuestionTab onChange={ this.handleQuestionChange } />
                </Tab>
                <Tab label='Users'>
                  <UserTab onChange={ this.handleUsersChange } />
                </Tab>
              </Tabs>
            </CardActions>
          </Card>
        </Inset>
        <Message
          open={ this.state.open }
          message={ this.state.message }
          onRequestClose={ this.handleClose } />
      </div>
    );
  }

  state = {
    open: false,
    message: 'Add success'
  };

  data = {};

  static propTypes = {
    addExam: PropTypes.func.isRequired,
    clearCache: PropTypes.func.isRequired,
    clearStatus: PropTypes.func.isRequired
  };
}

export default compose(
  redirectNotAdmin,
  connect(null, { ...examActions, clearCache, clearStatus })
)(ExamNewView);
