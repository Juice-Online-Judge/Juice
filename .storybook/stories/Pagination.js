import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Pagination from '../../src/components/Pagination';

storiesOf('Pagination', module)
.add('1 of 10', () => (
  <Pagination baseUrl='/' current={ 1 } maxPage={ 10 } />
))
.add('5 of 10', () => (
  <Pagination baseUrl='/' current={ 5 } maxPage={ 10 } />
))
.add('7 of 10', () => (
  <Pagination baseUrl='/' current={ 7 } maxPage={ 10 } />
))
.add('7 of 20', () => (
  <Pagination baseUrl='/' current={ 7 } maxPage={ 20 } />
))
.add('10 of 10', () => (
  <Pagination baseUrl='/' current={ 10 } maxPage={ 10 } />
))
.add('20 of 20', () => (
  <Pagination baseUrl='/' current={ 20 } maxPage={ 20 } />
));
