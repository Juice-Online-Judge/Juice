import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import uniqueId from 'lodash/uniqueId';
import toArray from 'lodash/toArray';

import TextField from 'material-ui/lib/text-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

import FileButton from './FileButton';
import styles from 'lib/styles';

export class FileArea extends Component {
  @autobind
  handleFileChange(fileList) {
    const content = {};

    content[this.props.textKey] = null;
    content[this.props.fileKey] = toArray(fileList);

    this.handleChange(content);
  }

  @autobind
  handleTextChange(event) {
    const { value } = event.target;
    const content = {};

    content[this.props.fileKey] = null;
    content[this.props.textKey] = null;
    if (value) {
      content[this.props.textKey] = [value];
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

  areaContent(type) {
    const { label, rows } = this.props;

    if (type === 'file') {
      return (
        <div>
          <FileButton
            onChange={ this.handleFileChange }
            multiple={ this.props.multiple }
            label={ label } />
        </div>
      );
    } else {
      return (
        <div>
          <TextField
            onChange={ this.handleTextChange }
            floatingLabelText='Input in here'
            multiLine
            rows={ rows } />
        </div>
      );
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
    type: 'file'
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
