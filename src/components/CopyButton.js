import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bind} from 'decko'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import ClipboardButton from 'react-clipboard.js'

import {setOpen} from 'redux/modules/message'
import MessageContainer from '../containers/MessageContainer'

export class CopyButton extends Component {
  @bind handleCopySuccess () {
    this.props.setOpen(true)
  }

  render () {
    const {text} = this.props
    return (
      <MessageContainer message='Copy success'>
        <ClipboardButton
          component='a'
          data-clipboard-text={text}
          onSuccess={this.handleCopySuccess}>
          <FlatButton label='Copy' primary disabled={!text} />
        </ClipboardButton>
      </MessageContainer>
    )
  }

  static propTypes = {
    text: PropTypes.string,
    setOpen: PropTypes.func.isRequired
  }
}

export default connect(null, {setOpen})(CopyButton)
