import React from 'react'
import {storiesOf} from '@storybook/react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from 'themes/light'

import TitleCard from 'components/TitleCard'

storiesOf('TitleCard', module)
  .add('Title', () =>
    <MuiThemeProvider muiTheme={theme}>
      <TitleCard title='Title' />
    </MuiThemeProvider>
  )
  .add('Title and subtitle', () =>
    <MuiThemeProvider muiTheme={theme}>
      <TitleCard title='Title' subtitle='Subtitle' />
    </MuiThemeProvider>
  )
