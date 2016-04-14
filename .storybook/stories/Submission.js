import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Submission from '../../src/components/Submission';

storiesOf('Submission', module)
.add('Basic (AC)', () => (
  <Submission
    id={ 11 }
    quesUuid='5d45436f-59b5-384e-8418-2cb357951153'
    title='Title'
    language='c'
    time='8.020'
    memory='26'
    result='AC' />
))
.add('Basic (WA)', () => (
  <Submission
    id={ 11 }
    quesUuid='5d45436f-59b5-384e-8418-2cb357951153'
    title='Title'
    language='c'
    time='8.020'
    memory='26'
    result='WA' />
));
