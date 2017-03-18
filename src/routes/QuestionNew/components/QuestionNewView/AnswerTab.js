import React, { Component, PropTypes } from 'react'
import { bind } from 'decko'

import FileButton from 'components/FileButton'

export class AnswerTab extends Component {
  componentDidMount() {
    this.handleChange()
  }

  @bind handleInputChange(file) {
    this.handleChange({ input: { file } })
  }

  @bind handleOutputChange(file) {
    this.handleChange({ output: { file } })
  }

  handleChange(data = {}) {
    // Fire change event
    this.setData(data)
    this.props.onChange(this.data)
  }

  setData(data) {
    this.data = { ...this.data, ...data }
  }

  render() {
    return (
      <div>
        <div>
          <h4> Input: </h4>
          <FileButton multiple onChange={ this.handleInputChange } />
        </div>
        <div>
          <h4> Output: </h4>
          <FileButton multiple onChange={ this.handleOutputChange } />
        </div>
      </div>
    )
  }

  data = {
    input: null,
    output: null
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };
}

export default AnswerTab
