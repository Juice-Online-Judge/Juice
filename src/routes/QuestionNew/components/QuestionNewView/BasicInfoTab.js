import React, {Component} from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import MarkdownEditor from 'components/MarkdownEditor'

export class BasicInfoTab extends Component {
  componentDidMount () {
    // Fire event to set default value
    this.handleChange()
  }

  handleUuidChange = event => {
    this.handleChange({uuid: event.target.value})
  }

  handleTitleChange = event => {
    this.handleChange({title: event.target.value})
  }

  handleDescChange = text => {
    this.handleChange({description: text})
  }

  handlePublicChange = event => {
    this.handleChange({public: event.target.checked})
  }

  handleChange (data = {}) {
    // Fire change event
    this.setData(data)
    this.props.onChange(this.data)
  }

  setData (data) {
    this.data = {...this.data, ...data}
  }

  render () {
    return (
      <div>
        <div>
          <TextField
            floatingLabelText='題目代號 (optional)'
            fullWidth
            onChange={this.handleUuidChange} />
        </div>
        <div>
          <TextField
            floatingLabelText='題目名稱'
            fullWidth
            onChange={this.handleTitleChange} />
        </div>
        <div>
          <MarkdownEditor onChange={this.handleDescChange} />
        </div>
        <div>
          <strong>考試題目請設為不公開</strong>
          <Toggle
            label='Public'
            labelPosition='right'
            onToggle={this.handlePublicChange} />
        </div>
      </div>
    )
  }

  data = {
    uuid: null,
    title: null,
    description: null,
    public: false
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }
}

export default BasicInfoTab
