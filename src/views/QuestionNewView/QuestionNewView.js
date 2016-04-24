import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import compose from 'recompose/compose';

import FlatButton from 'material-ui/FlatButton';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import SnackBar from 'material-ui/Snackbar';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import { Row, Col } from 'react-flexbox-grid';

import redirectNotAdmin from 'lib/redirectNotAdmin';
import { actions as questionActions } from 'redux/modules/question';
import { actions as appActions } from 'redux/modules/app';
import { RequestStatus } from 'lib/const';
import { createFormDataDeep } from 'lib/utils';
import BasicInfoTab from './BasicInfoTab';
import AnswerTab from './AnswerTab';
import RestrictionTab from './RestrictionTab';
import Inset from 'layouts/Inset';

class QuestionNewView extends Component {
  componentWillMount() {
    this.props.clearStatus();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.app.get('status') === RequestStatus.SUCCESS) {
      this.setState({
        open: true,
        message: 'Add success'
      });
    } else if (newProps.app.get('status') === RequestStatus.FAIL) {
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
        <Inset>
          <Card>
            <CardActions>
              <Row end='xs'>
                <Col md={ 2 } sm={ 6 }>
                  <FlatButton label='Add' onTouchTap={ this.handleAddQuestion } />
                </Col>
              </Row>
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
        </Inset>
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
    app: PropTypes.object.isRequired,
    addQuestion: PropTypes.func.isRequired,
    clearStatus: PropTypes.func.isRequired
  };
}

export default compose(
  redirectNotAdmin,
  connect((state) => ({ app: state.app }), { ...questionActions, ...appActions })
)(QuestionNewView);
