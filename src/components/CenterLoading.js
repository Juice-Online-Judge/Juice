import React, { PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import setPropTypes from 'recompose/setPropTypes';
import setDisplayName from 'recompose/setDisplayName';
import compose from 'recompose/compose';

import RefreshIndicator from 'material-ui/RefreshIndicator';

export const CenterLoading = compose(
  setDisplayName('CenterLoading'),
  setPropTypes({
    loading: PropTypes.bool
  })
)(({ loading }) => {
  const status = loading ? 'loading' : 'hide';
  return (
    <Row center='xs'>
      <Col>
        <RefreshIndicator status={ status } left={ window.innerWidth / 2 - 20 } top={ 10 } />
      </Col>
    </Row>
  );
});

export default CenterLoading;
