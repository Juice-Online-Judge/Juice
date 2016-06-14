import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { TransitionMotion, spring } from 'react-motion'

import Toast from './Toast'

class Toasts extends Component {
  componentDidMount() {
    const container = document.createElement('div')
    document.body.appendChild(container)
    this.container = container
    this.renderSubtree(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.renderSubtree(nextProps)
  }

  renderSubtree(props) {
    const { messages } = props

    const defaultStyles = messages.map((msg) => ({
      key: msg,
      style: styles.toast
    }))
    console.log(defaultStyles)

    const transitionStyles = messages.map((msg) => ({
      key: msg,
      style: { top: spring(0), opacity: spring(1) }
    }))
    console.log(transitionStyles)

    const child = (
      <TransitionMotion
        defaultStyles={ defaultStyles }
        styles={ transitionStyles }
        willLeave={ this.willLeave } >
        {
          (configs) => (
            <div style={ styles.fullScreen }>
              {
                configs.map((config) => (
                  <Toast
                    id={ config.key }
                    key={ config.key }
                    style={ config.style }
                    onRequestClose={ this.props.onRequestClose } >
                    { config.key }
                  </Toast>
                ))
              }
            </div>
          )
        }
      </TransitionMotion>
    )

    ReactDOM.unstable_renderSubtreeIntoContainer(this, child, this.container)
  }

  willLeave() {
    return {
      top: spring(-1),
      opacity: spring(0)
    }
  }

  render() {
    return null
  }

  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string),
    onRequestClose: PropTypes.func.isRequired
  }
}

export default Toasts

const styles = {
  fullScreen: {
    position: 'fixed',
    maxWidth: '86%',
    top: '10%',
    right: '7%',
    zIndex: 100000
  },
  toast: {
    opacity: 0,
    top: 1,
    marginTop: '10px',
    backgroundColor: '#323232',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItem: 'center',
    padding: '10px 25px',
    maxWidth: '100%',
    minHeight: '48px',
    float: 'right'
  }
}
