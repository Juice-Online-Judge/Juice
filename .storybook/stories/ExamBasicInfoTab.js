import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from 'themes/light';

import BasicInfoTab from 'views/ExamNewView/BasicInfoTab';

storiesOf('ExamBasicInfoTab', module)
.add('Basic', () => (
  <MuiThemeProvider muiTheme={ theme }>
    <BasicInfoTab onChange={ action('change') } />
  </MuiThemeProvider>
));
