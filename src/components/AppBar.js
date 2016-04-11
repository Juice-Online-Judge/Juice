import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import MuiAppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';

import { actions as accountActions } from 'redux/modules/account';

export class AppBar extends React.Component {
  static propTypes = {
    loginState: PropTypes.object.isRequired,
    fetchUserInfo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchUserInfo();
  }

  @autobind
  logout() {
    this.props.logout();
  }

  get rightMenu() {
    if (this.props.loginState.get('state')) {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton>
              <FontIcon className='material-icons'>
                more_vert
              </FontIcon>
            </IconButton>
          }
          targetOrigin={ {horizontal: 'right', vertical: 'top'} }
          anchorOrigin={ {horizontal: 'right', vertical: 'top'} } >
          <MenuItem primaryText='Logout' onTouchTap={ this.logout } />
        </IconMenu>
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
          <IndexLink style={ {
            color: 'white',
            textDecoration: 'inherit'
          } } to='/'>
            Juice
          </IndexLink>
        }
        iconElementRight={ this.rightMenu } />
    );
  }
}

export default connect((state) => {
  return {loginState: state.account};
}, accountActions)(AppBar);
