import React, { PropTypes } from 'react';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';
import compose from 'recompose/compose';

const ToggleDisplay = compose(
  setPropTypes({
    show: PropTypes.bool,
    hide: PropTypes.bool,
    children: PropTypes.node
  }),
  setDisplayName('ToggleDisplay')
)(({ show, hide, children }) => {
  const style = show || !hide ? null : styles.zeroHeight;
  return (
    <div style={ style }>
      { children }
    </div>
  );
});

export default ToggleDisplay;

const styles = {
  zeroHeight: {
    height: '0px',
    overflow: 'hidden'
  }
};
