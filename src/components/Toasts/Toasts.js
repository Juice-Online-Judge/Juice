import React, {Children, Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {TransitionMotion, spring} from 'react-motion'

import Toast from './internal/Toast'

class Toasts extends Component {
  componentDidMount () {
    const container = document.createElement('div')
    document.body.appendChild(container)
    this.container = container
    const {children} = this.props
    this.renderSubtree(children)
  }

  componentWillReceiveProps ({children}) {
    this.renderSubtree(children)
  }

  componentWillUnmount () {
    document.body.removeChild(this.container)
  }

  renderSubtree (children) {
    const transitionStyles = Children.map(children, toast => ({
      key: toast.key,
      data: {
        id: toast.props.id ? toast.props.id : toast.key,
        props: toast.props
      },
      style: {
        opacity: spring(1),
        marginTop: spring(10)
      }
    }))

    const child = (
      <TransitionMotion
        styles={transitionStyles}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        {configs =>
          <div style={styles.fullScreen}>
            {configs.map(config =>
              <Toast
                key={config.key}
                id={config.data.id}
                {...config.data.props}
                style={{...config.style, ...styles.toast}} />
            )}
          </div>}
      </TransitionMotion>
    )

    ReactDOM.unstable_renderSubtreeIntoContainer(this, child, this.container)
  }

  willEnter () {
    return {
      opacity: 0,
      marginTop: 20
    }
  }

  willLeave () {
    return {
      marginTop: spring(0),
      opacity: spring(0)
    }
  }

  render () {
    return null
  }

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
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
    top: '0px',
    right: '0px',
    backgroundColor: '#323232',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItem: 'center',
    padding: '10px 25px',
    maxWidth: '100%',
    minHeight: '48px'
  }
}
