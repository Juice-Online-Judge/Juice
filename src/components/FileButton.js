import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import FlatButton from 'material-ui/lib/flat-button';

export class FileButton extends Component {
  @autobind
  handleChange(event) {
    const files = event.target.files;
    if (this.props.onChange) {
      this.props.onChange(files);
    }
  }

  render() {
    return (
      <FlatButton label={ this.props.label } labelPosition='before'>
        <input type='file' style={ styles.file } onChange={ this.handleChange } />
      </FlatButton>
    );
  }

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
