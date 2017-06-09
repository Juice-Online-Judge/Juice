import React from 'react'
import {storiesOf} from '@storybook/react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from 'themes/light'

import ExamCard from 'components/ExamCard'

storiesOf('ExamCard', module).add('Basic', () =>
  <MuiThemeProvider muiTheme={theme}>
    <ExamCard
      name='Name'
      beganTime='2011-11-11 11:11:11'
      endedTime='2038-12-28 12:59:59' />
  </MuiThemeProvider>
)
