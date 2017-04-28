import React, {Component} from 'react'
import PropTypes from 'prop-types'
import isUndefined from 'lodash/isUndefined'
import styles from 'lib/styles'
import shallowEqual from 'fbjs/lib/shallowEqual'

import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Markdown from './Markdown'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import BoldIcon from 'material-ui/svg-icons/editor/format-bold'
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic'
import BulletedIcon from 'material-ui/svg-icons/editor/format-list-bulleted'
import NumberedIcon from 'material-ui/svg-icons/editor/format-list-numbered'

class MarkdownEditor extends Component {
  shouldComponentUpdate (_nextProps, nextState) {
    return !shallowEqual(this.state, nextState)
  }

  handlePreviewToggle = () => {
    this.setState({preview: !this.state.preview})
  }

  getTextField = textField => {
    this.textField = textField
  }

  handleSelect = event => {
    this.selectionStart = event.target.selectionStart
    this.selectionEnd = event.target.selectionEnd
  }

  handleBold = () => {
    this.appendOrWrapText('****')
  }

  handleItalic = () => {
    this.appendOrWrapText('__')
  }

  handleBulleted = () => {
    const {text} = this.state
    this.appendText(text ? '\n- ' : '- ')
  }

  handleNumbered = () => {
    const {text} = this.state
    this.appendText(text ? '\n1. ' : '1. ')
  }

  appendOrWrapText (addText) {
    if (this.isSelection()) {
      this.wrapText(addText)
    } else {
      this.appendTextAndMoveCursor(addText)
    }
  }

  wrapText (wrappedText) {
    wrappedText = wrappedText.substr(0, wrappedText.length / 2)
    const start = this.selectionStart
    const end = this.selectionEnd
    const {text} = this.state
    const selectedText = text.substr(start, end)
    const selectedBefore = text.substr(0, start)
    const selectedEnd = text.substr(end)
    this.setState(
      {
        text: `${selectedBefore}${wrappedText}${selectedText}${wrappedText}${selectedEnd}`
      },
      () => {
        this.moveCursor(end + wrappedText.length)
      }
    )
  }

  appendTextAndMoveCursor (appendText) {
    const {text} = this.state
    this.setState({text: `${text}${appendText}`}, () => {
      this.moveCursorBack(appendText.length / 2)
    })
  }

  appendText (appendText) {
    const {text} = this.state
    this.setState({text: `${text}${appendText}`}, () => {
      this.moveCursorBack(0)
    })
  }

  moveCursorBack (count) {
    const {text} = this.state
    this.moveCursor(text.length - count)
  }

  moveCursor (pos) {
    const {preview} = this.state
    if (preview) {
      return
    }

    this.textField.getInputNode().setSelectionRange(pos, pos)
    this.textField.focus()
  }

  isSelection () {
    if (isUndefined(this.selectionStart)) {
      return false
    }
    return this.selectionStart !== this.selectedEnd
  }

  handleChange = event => {
    const {onChange} = this.props
    const {value} = event.target
    this.setState({
      text: value
    })

    if (onChange) {
      onChange(value)
    }
  }

  render () {
    const {preview, text} = this.state
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <FlatButton
              icon={<EditIcon />}
              style={preview ? styles.none : styles.active}
              label={preview ? 'Preview' : 'Edit'}
              onTouchTap={this.handlePreviewToggle} />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle>
              Markdown Editor
            </ToolbarTitle>
            <IconButton disabled={preview} onTouchTap={this.handleBold}>
              <BoldIcon />
            </IconButton>
            <IconButton disabled={preview} onTouchTap={this.handleItalic}>
              <ItalicIcon />
            </IconButton>
            <IconButton disabled={preview} onTouchTap={this.handleBulleted}>
              <BulletedIcon />
            </IconButton>
            <IconButton disabled={preview} onTouchTap={this.handleNumbered}>
              <NumberedIcon />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        {preview
          ? <div style={{height: '15em'}}>
            <Markdown source={text || 'Nothing to preview'} />
          </div>
          : <TextField
            ref={this.getTextField}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            value={text}
            multiLine
            rows={10}
            hintText='Input here'
            fullWidth />}
      </div>
    )
  }

  state = {
    preview: false,
    text: ''
  }

  static propTypes = {
    onChange: PropTypes.func
  }
}

export default MarkdownEditor
