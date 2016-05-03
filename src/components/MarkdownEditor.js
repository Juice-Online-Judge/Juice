import React, { PropTypes, Component } from 'react';
import { autobind } from 'core-decorators';

import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Markdown from 'react-markdown';
import PreviewIcon from 'material-ui/svg-icons/action/toc';

class MarkdownEditor extends Component {
  @autobind
  handlePreviewToggle() {
    this.setState({ preview: !this.state.preview });
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
            <FlatButton label='Preview' icon={ <PreviewIcon /> } onTouchTap={ this.handlePreviewToggle } />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle>
              Markdown Editor
            </ToolbarTitle>
          </ToolbarGroup>
        </Toolbar>
        {
          preview ? (
            <Markdown source={ text || 'Nothing to preview' } />
          ) : (
            <TextField
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
