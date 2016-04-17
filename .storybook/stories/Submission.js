import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from 'themes/light';

import Submission from 'components/Submission';

storiesOf('Submission', module)
.add('Basic (AC)', () => (
  <MuiThemeProvider muiTheme={ theme }>
    <Submission
      id={ 11 }
      quesUuid='5d45436f-59b5-384e-8418-2cb357951153'
      title='Title'
      language='c'
      time='8.020'
      memory='26'
      result='AC' />
  </MuiThemeProvider>
))
.add('Basic (WA)', () => (
  <MuiThemeProvider muiTheme={ theme }>
    <Submission
      id={ 11 }
      quesUuid='5d45436f-59b5-384e-8418-2cb357951153'
      title='Title'
      language='c'
      time='8.020'
      memory='26'
      result='WA' />
  </MuiThemeProvider>
));
