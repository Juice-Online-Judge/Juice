import React from 'react'
import {storiesOf} from '@storybook/react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from 'themes/light'

import Pagination from 'components/Pagination'

storiesOf('Pagination', module)
  .add('1 of 10', () =>
    <MuiThemeProvider muiTheme={theme}>
      <Pagination baseUrl='/' current={1} maxPage={10} />
    </MuiThemeProvider>
  )
  .add('5 of 10', () =>
    <MuiThemeProvider muiTheme={theme}>
      <Pagination baseUrl='/' current={5} maxPage={10} />
    </MuiThemeProvider>
  )
  .add('7 of 10', () =>
    <MuiThemeProvider muiTheme={theme}>
      <Pagination baseUrl='/' current={7} maxPage={10} />
    </MuiThemeProvider>
  )
  .add('7 of 20', () =>
    <MuiThemeProvider muiTheme={theme}>
      <Pagination baseUrl='/' current={7} maxPage={20} />
    </MuiThemeProvider>
  )
  .add('10 of 10', () =>
    <MuiThemeProvider muiTheme={theme}>
      <Pagination baseUrl='/' current={10} maxPage={10} />
    </MuiThemeProvider>
  )
  .add('20 of 20', () =>
    <MuiThemeProvider muiTheme={theme}>
      <Pagination baseUrl='/' current={20} maxPage={20} />
    </MuiThemeProvider>
  )
