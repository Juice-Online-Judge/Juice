import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import uniqueId from 'lodash/uniqueId';

import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import FlatButton from 'material-ui/lib/flat-button';

import FileArea from './FileArea';
import Label from './Label';

import { actions as submissionActions } from 'redux/modules/submission';
import commonStyles from 'lib/styles';

export class SubmitCode extends Component {
  @autobind
  handleLanguageChange(event) {
    this.setState({ language: event.target.value });
  }

  @autobind
  handleCodeChange(content) {
    this.setState({ code: content.code });
  }

  @autobind
  handleSubmit() {
    const { uuid } = this.props;
    this.props.submitCode(uuid, this.state);
  }

  render() {
    return (
      <div>
        <Label label='Language: ' />
        <RadioButtonGroup
          name={ `language-${uniqueId()}` }
          defaultSelected='c'
          style={ styles.btnGroup }
          onChange={ this.handleLanguageChange } >
          <RadioButton
            value='c'
            label='C'
            style={ commonStyles.inlineRadio } />
          <RadioButton
            value='c++'
            label='C++'
            style={ commonStyles.inlineRadio } />
        </RadioButtonGroup>
        <FileArea
          fileKey='code'
          textKey='code'
          onChange={ this.handleCodeChange } />
        <FlatButton
          label='Submit'
          primary
          onTouchTap={ this.handleSubmit } />
      </div>
    );
  }

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    submission: PropTypes.object.isRequired,
    submitCode: PropTypes.func.isRequired,
    expanded: PropTypes.bool
  };

  state = {
    language: 'c'
  };
}

const styles = {
  btnGroup: {
    marginBottom: '5px'
  }
};

export default connect((state) => {
  return { submission: state.submission };
}, submissionActions)(SubmitCode);
