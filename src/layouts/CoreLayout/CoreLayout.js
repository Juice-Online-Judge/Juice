import React, { PropTypes } from 'react';
import { StyleRoot } from 'radium';
import setPropTypes from 'recompose/setPropTypes';
import setDisplayName from 'recompose/setDisplayName';
import compose from 'recompose/compose';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import 'codemirror/lib/codemirror.css';
import '../../styles/core.scss';
import theme from '../../themes/light';

import AppBar from 'components/AppBar';

export const CoreLayout = compose(
  setDisplayName('CoreLayout'),
  setPropTypes({
    children: PropTypes.element
  })
)(({ children }) => (
  <MuiThemeProvider muiTheme={ theme }>
    <div className='page-container' style={ styles.container }>
      <div className='view-container' style={ styles.container }>
        <StyleRoot>
          <AppBar />
          { children }
        </StyleRoot>
      </div>
    </div>
  </MuiThemeProvider>
));

export default CoreLayout;

let styles = {
  container: {
    height: '100%'
  }
};
