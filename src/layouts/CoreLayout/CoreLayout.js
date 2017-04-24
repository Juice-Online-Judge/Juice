import React from 'react'
import PropTypes from 'prop-types'
import setPropTypes from 'recompose/setPropTypes'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import 'styles/core.scss'
import theme from 'themes/light'

import AppBar from 'components/AppBar'

export const CoreLayout = compose(
  setDisplayName('CoreLayout'),
  setPropTypes({
    children: PropTypes.element
  })
)(({ children }) => (
  <MuiThemeProvider muiTheme={ theme }>
    <div className='page-container' style={ styles.container }>
      <div className='view-container' style={ styles.container }>
        <AppBar />
        {children}
      </div>
    </div>
  </MuiThemeProvider>
))

export default CoreLayout

const styles = {
  container: {
    height: '100%'
  }
}
