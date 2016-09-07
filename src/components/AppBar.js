import React, { PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'
import { bind } from 'decko'

import MuiAppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import LeftNav from './LeftNav'
import MenuLinkItem from './MenuLinkItem'

import { fetchUserInfo, logout } from 'redux/modules/account'
import commonStyles from 'lib/styles'

export class AppBar extends React.Component {
  componentDidMount() {
    this.props.fetchUserInfo()
  }

  @bind
  logout() {
    this.props.logout()
  }

  @bind
  handleClose() {
    this.setState({ open: false })
  }

  @bind
  handleToggle() {
    const open = !this.state.open
    this.setState({ open })
  }

  get leftMenu() {
    return (
      <IconButton onTouchTap={ this.handleToggle }>
        <MenuIcon />
      </IconButton>
    )
  }

  get rightMenu() {
    const { account } = this.props
    if (account.get('state')) {
      return (
        <div>
          <span style={ commonStyles.whiteColor }>
            { account.getIn(['user', 'nickname']) }
          </span>
          <IconMenu
            iconButtonElement={
              <IconButton iconStyle={ commonStyles.whiteIcon }>
                <MoreVertIcon />
              </IconButton>
            }
            targetOrigin={ styles.origin }
            anchorOrigin={ styles.origin } >
            <MenuLinkItem primaryText='Submission' to='/submissions' />
            <MenuItem primaryText='Logout' onTouchTap={ this.logout } />
          </IconMenu>
        </div>
      )
    } else {
      return (
        <div>
          <Link to='/sign-up'>
            <FlatButton labelStyle={ commonStyles.whiteColor } label='Signup' />
          </Link>
          <Link to='/sign-in'>
            <FlatButton labelStyle={ commonStyles.whiteColor } label='Signin' />
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <MuiAppBar
        title={
          <IndexLink style={ commonStyles.whiteLink } to='/'>
            Juice
          </IndexLink>
        }
        iconElementLeft={ this.leftMenu }
        iconElementRight={ this.rightMenu } >
        <LeftNav open={ this.state.open } onRequestChange={ this.handleClose } />
      </MuiAppBar>
    )
  }

  state = {
    open: false
  };

  static propTypes = {
    account: PropTypes.object.isRequired,
    fetchUserInfo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };
}

export default connect((state) => ({
  account: state.account
}), { fetchUserInfo, logout })(AppBar)

const styles = {
  origin: {
    horizontal: 'right',
    vertical: 'top'
  }
}
