import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import MuiAppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import LeftNav from './LeftNav';

import { actions as accountActions } from 'redux/modules/account';
import styles from 'lib/styles';

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
        <FontIcon className='material-icons'>
          menu
        </FontIcon>
      </IconButton>
    );
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
          <Link style={ styles.noUnderline } to='/submission'>
            <MenuItem primaryText='Submission' />
          </Link>
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
    loginState: PropTypes.object.isRequired,
    fetchUserInfo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };
}

export default connect((state) => {
  return {loginState: state.account};
}, accountActions)(AppBar);
