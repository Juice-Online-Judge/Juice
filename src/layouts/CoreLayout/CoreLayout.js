import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

import '../../styles/core.scss';
import theme from '../../themes/light';

import AppBar from 'components/AppBar';

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={ theme }>
        <div className='page-container' style={ styles.container }>
          <div className='view-container' style={ styles.container }>
            <AppBar />
            { this.props.children }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default CoreLayout;

let styles = {
  container: {
    height: '100%'
  }
};
