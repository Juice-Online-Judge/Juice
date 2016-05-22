import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { bind } from 'decko';
import qwery from 'qwery';
import isUndefined from 'lodash/isUndefined';
import styles from 'lib/styles';
import shallowEqual from 'fbjs/lib/shallowEqual';

import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Markdown from './Markdown';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import BoldIcon from 'material-ui/svg-icons/editor/format-bold';
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic';
import BulletedIcon from 'material-ui/svg-icons/editor/format-list-bulleted';
import NumberedIcon from 'material-ui/svg-icons/editor/format-list-numbered';

class MarkdownEditor extends Component {
  shouldComponentUpdate(_nextProps, nextState) {
    return !shallowEqual(this.state, nextState);
  }

  @bind
  handlePreviewToggle() {
    this.setState({ preview: !this.state.preview });
  }

  @bind
  getTextArea(textField) {
    if (!textField) {
      return;
    }
    this.textarea = qwery('textarea:nth-child(2)', findDOMNode(textField))[0];
    this.textarea.addEventListener('select', (event) => {
      this.selectionStart = event.target.selectionStart;
      this.selectionEnd = event.target.selectionEnd;
    });
  }

  @bind
  handleBold() {
    this.appendOrWrapText('****');
  }

  @bind
  handleItalic() {
    this.appendOrWrapText('__');
  }

  @bind
  handleBulleted() {
    const { text } = this.state;
    this.appendText(text ? '\n- ' : '- ');
  }

  @bind
  handleNumbered() {
    const { text } = this.state;
    this.appendText(text ? '\n1. ' : '1. ');
  }

  appendOrWrapText(addText) {
    if (this.isSelection()) {
      this.wrapText(addText);
    } else {
      this.appendTextAndMoveCursor(addText);
    }
  }

  wrapText(wrappedText) {
    wrappedText = wrappedText.substr(0, wrappedText.length / 2);
    const start = this.selectionStart;
    const end = this.selectionEnd;
    const { text } = this.state;
    const selectedText = text.substr(start, end);
    const selectedBefore = text.substr(0, start);
    const selectedEnd = text.substr(end);
    this.setState({
      text: `${selectedBefore}${wrappedText}${selectedText}${wrappedText}${selectedEnd}`
    }, () => {
      this.moveCursor(end + wrappedText.length);
    });
  }

  appendTextAndMoveCursor(appendText) {
    const { text } = this.state;
    this.setState({ text: `${text}${appendText}` }, () => {
      this.moveCursorBack(appendText.length / 2);
    });
  }

  appendText(appendText) {
    const { text } = this.state;
    this.setState({ text: `${text}${appendText}` }, () => {
      this.moveCursorBack(0);
    });
  }

  moveCursorBack(count) {
    const { text } = this.state;
    this.moveCursor(text.length - count);
  }

  moveCursor(pos) {
    const { preview } = this.state;
    if (preview) {
      return;
    }

    this.textarea.setSelectionRange(pos, pos);
    this.textarea.focus();
  }

  isSelection() {
    if (isUndefined(this.selectionStart)) {
      return false;
    }
    return this.selectionStart !== this.selectedEnd;
  }

  @bind
  handleChange(event) {
    const { onChange } = this.props;
    const { value } = event.target;
    this.setState({
      text: value
    });

    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const { preview, text } = this.state;
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <IconButton
              iconStyle={ preview ? styles.none : styles.active }
              onTouchTap={ this.handlePreviewToggle }>
              <EditIcon />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle>
              Markdown Editor
            </ToolbarTitle>
            <IconButton
              disabled={ preview }
              onTouchTap={ this.handleBold }>
              <BoldIcon />
            </IconButton>
            <IconButton
              disabled={ preview }
              onTouchTap={ this.handleItalic }>
              <ItalicIcon />
            </IconButton>
            <IconButton
              disabled={ preview }
              onTouchTap={ this.handleBulleted }>
              <BulletedIcon />
            </IconButton>
            <IconButton
              disabled={ preview }
              onTouchTap={ this.handleNumbered }>
              <NumberedIcon />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        {
          preview ? (
            <div style={ { height: '15em' } }>
              <Markdown source={ text || 'Nothing to preview' } />
            </div>
          ) : (
            <TextField
              ref={ this.getTextArea }
              onChange={ this.handleChange }
              value={ text }
              multiLine
              rows={ 10 }
              hintText='Input here'
              fullWidth />
          )
        }
      </div>
    );
  }

  state = {
    preview: false,
    text: ''
  };

  static propTypes = {
    onChange: PropTypes.func
  };
}

export default MarkdownEditor;
