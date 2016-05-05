import React, { PropTypes } from 'react';
import pure from 'recompose/pure';
import setPropTypes from 'recompose/setPropTypes';
import setDisplayName from 'recompose/setDisplayName';
import compose from 'recompose/compose';

import FlatButton from 'material-ui/FlatButton';

const DownloadButton = compose(
  setDisplayName('DownloadButton'),
  setPropTypes({
    text: PropTypes.string,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    filename: PropTypes.string
  })
)(({ text, disabled, label, filename }) => {
  filename = filename || 'download';
  if (disabled || !text) {
    return (
      <FlatButton label={ label } disabled />
    );
  }

  const url = `data:text/plain;base64,${btoa(text)}`;
  return (
    <FlatButton linkButton href={ url } label={ label } download={ filename } />
  );
});

export default pure(DownloadButton);
