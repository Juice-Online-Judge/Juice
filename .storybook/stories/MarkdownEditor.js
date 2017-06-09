import React from 'react'
import {storiesOf} from '@storybook/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from 'themes/light'

import MarkdownEditor from 'components/MarkdownEditor'

storiesOf('MarkdownEditor', module).add('MarkdownEditor', () =>
  <MuiThemeProvider muiTheme={theme}>
    <MarkdownEditor />
  </MuiThemeProvider>
)
