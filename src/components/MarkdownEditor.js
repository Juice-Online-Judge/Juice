import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { autobind } from 'core-decorators';
import qwery from 'qwery';

import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Markdown from 'react-markdown';
import PreviewIcon from 'material-ui/svg-icons/action/toc';
import BoldIcon from 'material-ui/svg-icons/editor/format-bold';
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic';

class MarkdownEditor extends Component {
  @autobind
  handlePreviewToggle() {
    this.setState({ preview: !this.state.preview });
  }

  @autobind
  getTextArea(textField) {
    if (!textField) {
      return;
    }
    this.textarea = qwery('textarea:nth-child(2)', findDOMNode(textField))[0];
  }

  @autobind
  handleBold() {
    this.appendTextAndMoveCursor('****');
  }

  @autobind
  handleItalic() {
    this.appendTextAndMoveCursor('__');
  }

  appendTextAndMoveCursor(appendText) {
    const { text } = this.state;
    this.setState({ text: `${text}${appendText}` }, () => {
      this.moveCursorBack(appendText.length / 2);
    });
  }

  moveCursorBack(count) {
    const { preview, text } = this.state;
    const pos = text.length - count;
    if (preview) {
      return;
    }

    this.textarea.setSelectionRange(pos, pos);
    this.textarea.focus();
  }

  @autobind
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
            <FlatButton
              label='Preview'
              secondary={ preview }
              icon={ <PreviewIcon /> }
              onTouchTap={ this.handlePreviewToggle } />
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
