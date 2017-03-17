import React, {PropTypes, PureComponent} from 'react'
import {connect} from 'react-redux'
import {bind} from 'decko'
import {push} from 'react-router-redux'

import MenuItem from 'material-ui/MenuItem'

export class MenuLinkItem extends PureComponent {
  @bind handleTouchTap() {
    this.props.push(this.props.to)
  }

  render() {
    const props = Object.assign({}, this.props)

    Reflect.deleteProperty(props, 'to')
    Reflect.deleteProperty(props, 'router')

    return <MenuItem { ...props } onTouchTap={ this.handleTouchTap } />
  }

  static propTypes = {
    to: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired
  };
}

export default connect(() => ({}), {push})(MenuLinkItem)
