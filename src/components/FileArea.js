import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import uniqueId from 'lodash/uniqueId';
import toArray from 'lodash/toArray';

import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton/RadioButton';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';

import FileButton from './FileButton';
import styles from 'lib/styles';

export class FileArea extends Component {
  @autobind
  handleFileChange(fileList) {
    const content = {};
    const { multiple } = this.props;
    const files = toArray(fileList);

    content[this.props.textKey] = null;
    content[this.props.fileKey] = multiple ? files : files[0];

    this.handleChange(content);
  }

  @autobind
  handleTextChange(event) {
    const { value } = event.target;
    const { multiple } = this.props;
    const content = {};

    content[this.props.fileKey] = null;
    content[this.props.textKey] = null;
    if (value) {
      if (multiple) {
        content[this.props.textKey] = [value];
      } else {
        content[this.props.textKey] = value;
      }
    }

    this.handleChange(content);
  }

  handleChange(content) {
    if (this.props.onChange) {
      this.props.onChange(content);
    }
  }

  @autobind
  handleTypeChange(event) {
    const { value } = event.target;
    this.setState({ type: value });
  }

  get textareas() {
    const { rows } = this.props;

    return (
      <TextField
        onChange={ this.handleTextChange }
        floatingLabelText='Input in here'
        multiLine
        rows={ rows } />
    );
  }

  areaContent(type) {
    const { label } = this.props;

    if (type === 'file') {
      return (
        <FileButton
          onChange={ this.handleFileChange }
          multiple={ this.props.multiple }
          label={ label } />
      );
    } else {
      return this.textareas;
    }
  }

  render() {
    return (
      <div>
        <div>
          <RadioButtonGroup
            name={ `FileArea-type-${uniqueId()}` }
            defaultSelected='file'
            onChange={ this.handleTypeChange }>
            <RadioButton
              style={ styles.inlineRadio }
              value='file'
              label='File' />
            <RadioButton
              style={ styles.inlineRadio }
              value='textarea'
              label='TextArea' />
          </RadioButtonGroup>
        </div>
        { this.areaContent(this.state.type) }
      </div>
    );
  }

  state = {
    type: 'file',
    count: 1,
    textarea: []
  };

  static propTypes = {
    label: PropTypes.string,
    rows: PropTypes.number,
    fileKey: PropTypes.string,
    textKey: PropTypes.string,
    multiple: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    label: 'Select a file...',
    rows: 5,
    fileKey: 'file',
    textKey: 'textarea'
  };
}

export default FileArea;
