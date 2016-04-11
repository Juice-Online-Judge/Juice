import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import { IndexLink } from 'react-router';
import MuiLeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

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
      </MuiLeftNav>
    );
  }

  static propTypes = {
    onRequestChange: PropTypes.func.isRequired
  }
}

export default LeftNav;
