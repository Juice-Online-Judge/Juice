import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from 'themes/light';

import TitleCard from 'components/TitleCard';

storiesOf('TitleCard', module)
.add('Title', () => (
  <MuiThemeProvider theme={ theme }>
    <TitleCard title='Title' />
  </MuiThemeProvider>
))
.add('Title and subtitle', () => (
  <MuiThemeProvider theme={ theme }>
    <TitleCard title='Title' subtitle='Subtitle' />
  </MuiThemeProvider>
));
