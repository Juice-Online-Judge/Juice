import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bind} from 'decko'

import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

import Label from 'components/Label'

export class RestrictionTab extends Component {
  componentDidMount () {
    this.handleChange()
  }

  @bind handleFileChange (event) {
    this.handleChange({file: event.target.value})
  }

  @bind handleMemoryChange (event) {
    this.handleChange({memory: event.target.value})
  }

  @bind handleTimeChange (event) {
    this.handleChange({time: event.target.value})
  }

  @bind handleStrategyChange (_event, _key, value) {
    this.setState({strategy: value})
    this.emitChange({
      ...this.data,
      strategy: value
    })
  }

  handleChange (data = {}) {
    // Fire change event
    this.setData(data)
    this.emitChange({
      ...this.data,
      strategy: this.state.strategy
    })
  }

  emitChange (data) {
    this.props.onChange({restriction: data})
  }

  setData (data) {
    this.data = {...this.data, ...data}
  }

  render () {
    const {strategy} = this.state

    return (
      <div>
        <div>
          <Label> Strategy </Label>
          <DropDownMenu value={strategy} onChange={this.handleStrategyChange}>
            <MenuItem primaryText='Normal' value='normal' />
            <MenuItem primaryText='Tolerance newline' value='tolerance_nl' />
          </DropDownMenu>
        </div>
        <div>
          <TextField
            floatingLabelText='Time limit(s)'
            onChange={this.handleTimeChange} />
        </div>
        <div>
          <TextField
            floatingLabelText='Memory limit(MB)'
            onChange={this.handleMemoryChange} />
        </div>
        <div>
          <TextField
            floatingLabelText='File limit'
            onChange={this.handleFileChange} />
        </div>
      </div>
    )
  }

  data = {
    time: null,
    file: null,
    memory: null
  }

  state = {
    strategy: 'normal'
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }
}

export default RestrictionTab
