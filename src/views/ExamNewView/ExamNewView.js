import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import TextField from 'material-ui/TextField';
import Inset from 'layouts/Inset';

import { actions as examActions } from 'redux/modules/exam';

export class ExamNewView extends Component {
  @autobind
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <Inset>
        <Card>
          <CardActions>
            <TextField floatingLabelText='Name' onChange={ this.handleNameChange } />
          </CardActions>
        </Card>
      </Inset>
    );
  }

  static propTypes = {
    addExam: PropTypes.func.isRequired
  };
}

export default connect(null, examActions)(ExamNewView);
