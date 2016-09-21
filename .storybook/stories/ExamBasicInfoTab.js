import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from 'themes/light';

import BasicInfoTab from 'routes/Exam/routes/New/components/ExamNewView/BasicInfoTab';
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createHistory } from 'history'
import configureStore from 'redux/configureStore'

const browserHistory = useRouterHistory(createHistory)(historyConfig)

const store = configureStore({ browserHistory })

storiesOf('ExamBasicInfoTab', module)
.add('Basic', () => (
  <MuiThemeProvider muiTheme={ theme }>
    <BasicInfoTab store={ store } onChange={ action('change') } />
  </MuiThemeProvider>
));
