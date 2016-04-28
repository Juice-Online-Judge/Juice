import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import styles from 'lib/styles';

export class LeftNav extends Component {
  @autobind
  handleChange() {
    this.props.onRequestChange.apply(null, arguments);
  }

  render() {
    return (
      <Drawer { ...this.props } docked={ false } onRequestChange={ this.handleChange }>
        <Link to='/exams' style={ styles.noUnderline } >
          <MenuItem onTouchTap={ this.handleChange }>
            Exams
          </MenuItem>
        </Link>
        <Link to='/questions' style={ styles.noUnderline } >
          <MenuItem onTouchTap={ this.handleChange }>
            Question
          </MenuItem>
        </Link>
        <Link to='/submissions' style={ styles.noUnderline } >
          <MenuItem onTouchTap={ this.handleChange }>
            Submission
          </MenuItem>
        </Link>
      </Drawer>
    );
  }

  static propTypes = {
    onRequestChange: PropTypes.func.isRequired
  }
}

export default LeftNav;
