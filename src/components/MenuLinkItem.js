import React, { PropTypes, PureComponent } from 'react'
import { bind } from 'decko'
import withRouter from 'react-router/lib/withRouter'
import { routerShape } from 'react-router/lib/PropTypes'

import MenuItem from 'material-ui/MenuItem'

export class MenuLinkItem extends PureComponent {
  @bind
  handleTouchTap() {
    this.props.router.push(this.props.to)
  }

  render() {
    const props = Object.assign({}, this.props)

    Reflect.deleteProperty(props, 'to')
    Reflect.deleteProperty(props, 'router')

    return (
      <MenuItem
        { ...props }
        onTouchTap={ this.handleTouchTap } />
    )
  }

  static propTypes = {
    to: PropTypes.string.isRequired,
    router: routerShape
  }
}

export default withRouter(MenuLinkItem)
