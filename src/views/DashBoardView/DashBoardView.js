import React, { Component } from 'react'
import { bind } from 'decko'
import without from 'lodash/without'
import concat from 'lodash/concat'

import FlatButton from 'material-ui/FlatButton'
import Toasts from 'components/Toasts'

export class DashBoard extends Component {
  @bind
  handleRequestClose(id) {
    this.setState({ messages: without(this.state.messages, id) })
  }

  @bind
  addToast() {
    this.setState({ messages: concat(this.state.messages, `Toast${this.count}`) })
    this.count += 1
  }

  render() {
    return (
      <div>
        <FlatButton label='Toast' onTouchTap={ this.addToast } />
        <Toasts messages={ this.state.messages } onRequestClose={ this.handleRequestClose } />
      </div>
    )
  }

  count = 0

  state = {
    messages: []
  }
}

export default DashBoard
