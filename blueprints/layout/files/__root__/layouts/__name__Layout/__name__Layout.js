import React, { PropTypes } from 'react';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';
import compose from 'recompose/compose';

export const <%= pascalEntityName %> = compose(
  setDisplayName('<%= pascalEntityName %>'),
  setPropTypes({
    children: PropTypes.element
  })
)(({ children }) => (
  <div>
    {children}
  </div>
));

export default <%= pascalEntityName %>;
