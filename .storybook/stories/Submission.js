import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Submission from '../../src/components/Submission';

storiesOf('Submission', module)
.add('Basic', () => (
  <Submission></Submission>
));
