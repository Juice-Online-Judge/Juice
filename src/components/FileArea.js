import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import TextField from 'material-ui/lib/text-field';

import FileButton from './FileButton';

export class FileArea extends Component {
  @autobind
  handleFileChange(fileList) {
    const content = {};
    content[this.props.textKey] = null;
    if (fileList.length) {
      content[this.props.fileKey] = fileList[0];
      this.setState({ file: fileList[0] });
    } else {
      content[this.props.fileKey] = null;
      this.setState({ file: null });
    }

    this.handleChange(content);
  }

  @autobind
  handleTextChange(event) {
    const { value } = event.target;
    const content = {};
    content[this.props.fileKey] = null;
    content[this.props.textKey] = null;
    if (value) {
      content[this.props.textKey] = value;
    }

    this.setState({ text: value });
    this.handleChange(content);
  }

  handleChange(content) {
    const { fileKey } = this.props;
    if (!content[fileKey] && this.state.file) {
      // Don't fire change event on textarea change when both input have value
      return;
    }

    if (this.props.onChange) {
      this.props.onChange(content);
    }
  }

  render() {
    const { label, rows } = this.props;
    return (
      <div>
        <div>
          <FileButton onChange={ this.handleFileChange } label={ label } />
        </div>
        <div>
          <TextField
            onChange={ this.handleTextChange }
            floatingLabelText='Or input in here'
            multiLine
            rows={ rows } />
        </div>
      </div>
    );
  }

  state = {
    file: null,
    text: ''
  };

  static propTypes = {
    label: PropTypes.string,
    rows: PropTypes.number,
    fileKey: PropTypes.string,
    textKey: PropTypes.string,
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
