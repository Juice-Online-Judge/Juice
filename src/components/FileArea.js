import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import uniqueId from 'lodash/uniqueId';
import toArray from 'lodash/toArray';
import times from 'lodash/times';
import clone from 'lodash/clone';
import omit from 'lodash/omit';

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
  handleTextChange(event, idx) {
    const { value } = event.target;
    const { multiple } = this.props;
    const content = {};
    const textarea = clone(this.state.textarea);

    content[this.props.fileKey] = null;
    content[this.props.textKey] = null;
    if (value) {
      if (multiple) {
        textarea[idx] = value;
        content[this.props.textKey] = textarea;
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
    const { rows, multiple } = this.props;

    if (multiple) {
      return times(this.state.count, (idx) => {
        return (
          <IndexableTextField
            onChange={ this.handleTextChange }
            index={ idx }
            floatingLabelText='Input in here'
            multiLine
            key={ idx }
            rows={ rows } />
        );
      });
    } else {
      return (
        <TextField
          onChange={ this.handleTextChange }
          floatingLabelText='Input in here'
          multiLine
          rows={ rows } />
      );
    }
  }

  areaContent(type) {
    const { label } = this.props;

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
          { this.textareas }
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

class IndexableTextField extends Component {
  @autobind
  handleChange(event) {
    const { onChange, index } = this.props;
    if (onChange) {
      onChange(event, index);
    }
  }

  render() {
    const props = omit(this.props, ['index', 'onChange']);

    return (
      <TextField onChange={ this.handleChange } { ...props } />
    );
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func
  };
}
