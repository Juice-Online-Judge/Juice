import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import { Link, IndexLink } from 'react-router';
import MuiLeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import styles from 'lib/styles';

export class LeftNav extends Component {
  @autobind
  handleChange() {
    this.props.onRequestChange.apply(null, arguments);
  }

  render() {
    return (
      <MuiLeftNav { ...this.props } docked={ false } onRequestChange={ this.handleChange }>
        <IndexLink to='/' style={ styles.noUnderline } >
          <MenuItem onTouchTap={ this.handleChange }>
            Question
          </MenuItem>
        </IndexLink>
        <Link to='/submission' style={ styles.noUnderline } >
          <MenuItem onTouchTap={ this.handleChange }>
            Submission
          </MenuItem>
        </Link>
      </MuiLeftNav>
    );
  }

  static propTypes = {
    onRequestChange: PropTypes.func.isRequired
  }
}

export default LeftNav;
