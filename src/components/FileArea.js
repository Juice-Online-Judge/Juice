import React, { Component, PropTypes } from 'react'
import { bind, memoize } from 'decko'
import uniqueId from 'lodash/uniqueId'
import toArray from 'lodash/toArray'
import invariant from 'invariant'

import TextField from 'material-ui/TextField'
import RadioButton from 'material-ui/RadioButton/RadioButton'
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup'
import Codemirror from 'react-codemirror'
import 'codemirror/mode/clike/clike'

import FileButton from './FileButton'
import styles from 'lib/styles'

export class FileArea extends Component {
  componentWillReceiveProps(nextProps) {
    if (__DEV__) {
      invariant(
        this.props.multiple !== nextProps.multiple ||
        this.props.mode !== nextProps.mode,
        'Component <FileArea /> not allow change props `multiple` or `mode` on the fly'
      )
    }
  }

  @bind
  handleFileChange(fileList) {
    const content = {}
    const { multiple } = this.props
    const files = toArray(fileList)

    content[this.props.textKey] = null
    content[this.props.fileKey] = multiple ? files : files[0]

    this.handleChange(content)
  }

  @bind
  handleTextAreaChange(event) {
    const { value } = event.target
    this.handleTextChange(value)
  }

  @bind
  handleTextChange(value) {
    const { multiple } = this.props
    const content = {}

    content[this.props.fileKey] = null
    content[this.props.textKey] = null
    if (value) {
      if (multiple) {
        content[this.props.textKey] = [value]
      } else {
        content[this.props.textKey] = value
      }
    }

    this.handleChange(content)
  }

  handleChange(content) {
    if (this.props.onChange) {
      this.props.onChange(content)
    }
  }

  @bind
  handleTypeChange(event) {
    const { value } = event.target
    this.setState({ type: value })
  }

  get textareas() {
    const { rows, mode } = this.props
    const options = {
      mode: 'clike',
      theme: 'monokai-bright'
    }

    if (mode === 'text') {
      return (
        <TextField
          onChange={ this.handleTextAreaChange }
          floatingLabelText='Input in here'
          multiLine
          rows={ rows } />
      )
    } else {
      return (
        <Codemirror
          autoSave
          onChange={ this.handleTextChange }
          options={ options } />
      )
    }
  }

  @memoize
  areaContent(type) {
    const { label } = this.props

    if (type === 'file') {
      return (
        <FileButton
          onChange={ this.handleFileChange }
          multiple={ this.props.multiple }
          label={ label } />
      )
    } else {
      return this.textareas
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
    )
  }

  state = {
    type: 'file'
  };

  static propTypes = {
    label: PropTypes.string,
    rows: PropTypes.number,
    fileKey: PropTypes.string,
    textKey: PropTypes.string,
    multiple: PropTypes.bool,
    mode: PropTypes.oneOf(['text', 'code']),
    onChange: PropTypes.func
  };

  static defaultProps = {
    label: 'Select a file...',
    rows: 5,
    fileKey: 'file',
    textKey: 'textarea',
    mode: 'text'
  };
}

export default FileArea
