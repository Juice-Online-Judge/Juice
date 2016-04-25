import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';
import compose from 'recompose/compose';

import CenterLoading from './CenterLoading';
import { isPendingSelector } from 'redux/modules/app';

const LoadingContainer = compose(
  connect((state) => ({ pending: isPendingSelector(state) })),
  setPropTypes({
    children: PropTypes.node,
    pending: PropTypes.bool.isRequired
  }),
  setDisplayName('LoadingContainer')
)(({ pending, children }) => (
  <div style={ styles.container }>
    <CenterLoading loading={ pending } />
    { children }
  </div>
));

export default LoadingContainer;

const styles = {
  container: {
    position: 'relative'
  }
};
