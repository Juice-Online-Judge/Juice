import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TitleCard from 'components/TitleCard';

storiesOf('TitleCard', module)
.add('Title', () => (
  <TitleCard title='Title' />
))
.add('Title and subtitle', () => (
  <TitleCard title='Title' subtitle='Subtitle' />
));
