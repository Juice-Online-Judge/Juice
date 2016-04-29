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
import { addQuestion } from 'redux/modules/question';
import { clearStatus } from 'redux/modules/app';
import { createFormDataDeep } from 'lib/utils';
import BasicInfoTab from './BasicInfoTab';
import AnswerTab from './AnswerTab';
import RestrictionTab from './RestrictionTab';
import Inset from 'layouts/Inset';

class QuestionNewView extends Component {
  componentWillMount() {
    this.props.clearStatus();
  }

  @autobind
  handleBasicInfoChange(data) {
    this.setData(data);
  }

  @autobind
  handleAnswerChange(data) {
    this.setData(data);
  }

  @autobind
  handleRestrictionChange(data) {
    this.setData(data);
  }

  setData(data) {
    this.data = { ...this.data, ...data };
  }

  @autobind
  handleAddQuestion() {
    this.props.addQuestion(createFormDataDeep(this.data))
      .then((result) => {
        if (result) {
          this.setState({
            open: true,
            message: 'Add success'
          });
        } else {
          this.setState({
            open: true,
            message: 'Add fail'
          });
        }
      });
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
          onRequestClose={ this.handleClose } />
      </div>
    );
  }

  state = {
    message: 'Add success',
    open: false
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
