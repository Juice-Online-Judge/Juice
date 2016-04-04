import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

export class FileButton extends Component {
  @autobind
  handleChange(event) {
    const files = event.target.files;
    if (files.length) {
      this.setState({ filename: files[0].name });
    } else {
      this.setState({ filename: null });
    }

    if (this.props.onChange) {
      this.props.onChange(files);
    }
  }

  render() {
    return (
      <div>
        <FlatButton primary label={ this.props.label } labelPosition='before'>
          <input type='file' style={ styles.file } onChange={ this.handleChange } />
        </FlatButton>
        <TextField hintText='Please select file' value={ this.state.filename } />
      </div>
    );
  }

  state = {
    filename: null
  };

  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };
}

export default FileButton;

const styles = {
  file: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    minWidth: '100%',
    minHeight: '100%',
    opacity: 0,
    filter: 'alpha(opacity=0)',
    outline: 'none',
    display: 'block'
  }
};
