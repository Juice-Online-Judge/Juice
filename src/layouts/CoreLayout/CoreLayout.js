import React, { PropTypes } from 'react';
import { StyleRoot } from 'radium';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

import '../../styles/core.scss';
import theme from '../../themes/light';

import AppBar from 'components/AppBar';

export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={ theme }>
        <div className='page-container' style={ styles.container }>
          <div className='view-container' style={ styles.container }>
            <StyleRoot>
              <AppBar />
              { this.props.children }
            </StyleRoot>
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
