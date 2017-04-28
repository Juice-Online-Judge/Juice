import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Message from 'components/Message'
import {setOpen} from 'redux/modules/message'

export class MessageContainer extends Component {
  handleClose = () => {
    this.props.setOpen(false)
    if (this.props.onRequestClose) {
      this.props.onRequestClose()
    }
  }

  render () {
    const {children, messageStore, message} = this.props
    return (
      <div>
        {children}
        <Message
          open={messageStore.get('open')}
          message={message || messageStore.get('message')}
          onRequestClose={this.handleClose} />
      </div>
    )
  }

  static propTypes = {
    message: PropTypes.string,
    messageStore: PropTypes.object.isRequired,
    setOpen: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    children: PropTypes.node
  }
}

export default connect(state => ({messageStore: state.message}), {setOpen})(
  MessageContainer
)
