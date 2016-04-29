import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import MuiAppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import LeftNav from './LeftNav';

import { fetchUserInfo, logout } from 'redux/modules/account';
import commonStyles from 'lib/styles';

export class AppBar extends React.Component {
  componentDidMount() {
    this.props.fetchUserInfo();
  }

  @autobind
  logout() {
    this.props.logout();
  }

  @autobind
  handleClose() {
    this.setState({ open: false });
  }

  @autobind
  handleToggle() {
    const open = !this.state.open;
    this.setState({ open });
  }

  get leftMenu() {
    return (
      <IconButton onTouchTap={ this.handleToggle }>
        <MenuIcon />
      </IconButton>
    );
  }

  get rightMenu() {
    const origin = {
      horizontal: 'right',
      vertical: 'top'
    };
    const { account } = this.props;
    if (account.get('state')) {
      return (
        <div style={ styles.rightMenu }>
          <span>{ account.getIn(['user', 'nickname']) }</span>
          <IconMenu
            iconButtonElement={
              <IconButton iconStyle={ styles.icon }>
                <MoreVertIcon />
              </IconButton>
            }
            targetOrigin={ origin }
            anchorOrigin={ origin } >
            <Link style={ commonStyles.noUnderline } to='/submissions'>
              <MenuItem primaryText='Submission' />
            </Link>
            <MenuItem primaryText='Logout' onTouchTap={ this.logout } />
          </IconMenu>
        </div>
      );
    } else {
      return (
        <div>
          <Link to='/sign-up'>
            <FlatButton labelStyle={ { color: 'white' } } label='Signup' />
          </Link>
          <Link to='/sign-in'>
            <FlatButton labelStyle={ { color: 'white' } } label='Signin' />
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <MuiAppBar
        title={
          <IndexLink style={ styles.link } to='/'>
            Juice
          </IndexLink>
        }
        iconElementLeft={ this.leftMenu }
        iconElementRight={ this.rightMenu } >
        <LeftNav open={ this.state.open } onRequestChange={ this.handleClose } />
      </MuiAppBar>
    );
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
}), { fetchUserInfo, logout })(AppBar);

const styles = {
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  icon: {
    color: 'white',
    fill: 'white'
  },
  rightMenu: {
    color: 'white',
    verticalAlign: 'middle'
  }
};
