import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ExamCard from 'components/ExamCard';

storiesOf('ExamCard', module)
.add('Basic', () => (
  <ExamCard
    name='Name'
    beganTime='2011-11-11 11:11:11'
    endedTime='2038-12-28 12:59:59' />
));
