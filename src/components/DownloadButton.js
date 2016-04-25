import React, { PropTypes, Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

class DownloadButton extends Component {
  render() {
    const filename = this.props.filename || 'download';
    const { text, disabled, label } = this.props;

    if (disabled || !text) {
      return (
        <FlatButton label={ label } disabled />
      );
    }

    if (text !== this.text) {
      this.url = `data:text/plain;base64,${btoa(text)}`;
      this.text = text;
      this.renderedElement = (
        <FlatButton linkButton href={ this.url } label={ label } download={ filename } />
      );
    }

    return this.renderedElement;
  }

  url = '';
  text = '';

  static propTypes = {
    text: PropTypes.string,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    filename: PropTypes.string
  };
}

export default DownloadButton;
