import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';

import FileArea from './FileArea';
import Label from './Label';

import { actions as submissionActions } from 'redux/modules/submission';

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
    const { uuid } = this.props;
    this.props.submitCode(uuid, this.state);
  }

  render() {
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
  margin: {
    marginLeft: '5px',
    marginBottom: '5px'
  }
};

export default connect((state) => {
  return { submission: state.submission };
}, submissionActions)(SubmitCode);
