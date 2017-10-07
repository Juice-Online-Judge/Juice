import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import copy from 'copy-text-to-clipboard'

import { setOpen } from 'redux/modules/message'
import MessageContainer from '../containers/MessageContainer'

export class CopyButton extends Component {
  handleClick = () => {
    if (copy(this.props.text)) {
      this.props.setOpen(true)
    }
  }

  render () {
    const { text } = this.props
    return (
      <MessageContainer message='Copy success'>
        <FlatButton
          onClick={this.handleClick}
          label='Copy'
          primary
          disabled={!text} />
      </MessageContainer>
    )
  }

  static propTypes = {
    text: PropTypes.string,
    setOpen: PropTypes.func.isRequired
  }
}

export default connect(null, { setOpen })(CopyButton)
