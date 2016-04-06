import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import pick from 'lodash/pick';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Toggle from 'material-ui/lib/toggle';
import SnackBar from 'material-ui/lib/snackbar';

import FileArea from 'components/FileArea';

import { actions as questionActions } from 'redux/modules/question';
import { RequestStatus } from 'lib/const';
import { createFormDataDeep } from 'lib/utils';


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
  handleUuidChange(event) {
    this.setState({ uuid: event.target.value });
  }

  @autobind
  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  @autobind
  handleDescChange(event) {
    this.setState({ description: event.target.value });
  }

  @autobind
  handlePublicChange(event) {
    this.setState({ public: event.target.checked });
  }

  @autobind
  handleInputChange(content) {
    this.setState({ input: content });
  }

  @autobind
  handleAddQuestion() {
    const data = pick(this.state, [
      'public',
      'title',
      'description',
      'uuid',
      'input',
      'output'
    ]);

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
            <TextField
              floatingLabelText='UUID (optional)'
              fullWidth
              onChange={ this.handleUuidChange } />
          </CardActions>
          <CardActions>
            <TextField
              floatingLabelText='Title'
              fullWidth
              onChange={ this.handleTitleChange } />
          </CardActions>
          <CardActions>
            <TextField
              floatingLabelText='Description'
              fullWidth
              multiLine
              onChange={ this.handleDescChange }
              rows={ 10 }/>
          </CardActions>
          <CardActions>
            <FileArea onChange={ this.handleInputChange } />
          </CardActions>
          <CardActions>
            <Toggle
              label='Public'
              labelPosition='right'
              defaultToggled
              onToggle={ this.handlePublicChange } />
          </CardActions>
          <CardActions>
            <FlatButton label='Add' onTouchTap={ this.handleAddQuestion } />
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
    uuid: '',
    title: '',
    description: '',
    public: true,
    input: null,
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
