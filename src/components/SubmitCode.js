import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { autobind } from 'core-decorators';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import FileArea from './FileArea';
import Label from './Label';
import Message from './Message';

import { submitCode } from 'redux/modules/submission';

export class SubmitCode extends Component {
  @autobind
  handleLanguageChange(_event, _index, value) {
    this.setState({ language: value });
  }

  @autobind
  handleCodeChange(content) {
    this.setState({ code: content.code });
  }

  @autobind
  handleSubmit() {
    const { uuid, examId } = this.props;
    this.props.submitCode({
      uuid,
      examId,
      ...this.state
    }).then((result) => {
      if (result) {
        this.setState({ open: true, message: 'Submit success' });
      } else {
        this.setState({ open: true, message: 'Submit fail. Please retry later.' });
      }
    });
  }

  @autobind
  handleClose() {
    this.setState({ open: false });
    this.props.goBack();
  }

  render() {
    const { open, message } = this.state;
    return (
      <div>
        <Label label='Language: ' />
        <SelectField
          style={ styles.margin }
          value={ this.state.language }
          onChange={ this.handleLanguageChange } >
          <MenuItem value='c' primaryText='C' />
          <MenuItem value='c++' primaryText='C++' />
        </SelectField>
        <FileArea
          fileKey='code'
          textKey='code'
          mode='code'
          onChange={ this.handleCodeChange } />
        <FlatButton
          label='Submit'
          primary
          onTouchTap={ this.handleSubmit } />
        <Message
          open={ open }
          message={ message }
          onRequestClose={ this.handleClose } />
      </div>
    );
  }

  state = {
    language: 'c',
    open: false,
    message: 'Submission success'
  };

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    examId: PropTypes.string,
    submission: PropTypes.object.isRequired,
    submitCode: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    expanded: PropTypes.bool
  };
}

const styles = {
  margin: {
    marginLeft: '5px',
    marginBottom: '5px'
  }
};

export default connect((state) => ({
  submission: state.submission
}), { submitCode, goBack })(SubmitCode);
