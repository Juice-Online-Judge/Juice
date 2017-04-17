import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'
import {findDOMNode} from 'react-dom'
import recaptcha from './recaptcha-wrapper'

class Recaptcha extends Component {
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    recaptcha.checkRecaptchaLoad()
    this.recaptcha = recaptcha
  }

  getContainer = container => {
    const {sitekey, onVerify, onExpired} = this.props

    this.container = container
    if (container) {
      recaptcha.render(findDOMNode(container), {
        sitekey,
        callback: onVerify,
        'expired-callback': onExpired
      })
    }
  }

  render() {
    const {children} = this.props

    if (children) {
      return React.cloneElement(Children.only(children), {
        ref: this.getContainer
      })
    }

    return <div ref={ this.getContainer } />
  }

  static propTypes = {
    children: PropTypes.element,
    sitekey: PropTypes.string.isRequired,
    onVerify: PropTypes.func,
    onExpired: PropTypes.func
  }
}

export default Recaptcha
