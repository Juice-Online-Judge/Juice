import React, { PropTypes, Component } from 'react';
import { autobind } from 'core-decorators';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import ClipboardButton from 'react-clipboard.js';

export class CopyButton extends Component {
  @autobind
  handleCopySuccess() {
    this.setState({ open: true });
  }

  @autobind
  handleRequestClose() {
    this.setState({ open: false });
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        <ClipboardButton
          component='a'
          data-clipboard-text={ text }
          onSuccess={ this.handleCopySuccess } >
          <FlatButton label='Copy' primary disabled={ !text } />
        </ClipboardButton>
        <Snackbar
          open={ this.state.open }
          message='Copy success'
          autoHideDuration={ 1000 }
          onRequestClose={ this.handleRequestClose } />
      </div>
    );
  }

  state = {
    open: false
  };

  static propTypes = {
    text: PropTypes.string
  };
}

export default CopyButton;
