import React, { PropTypes } from 'react';
import setPropTypes from 'recompose/setPropTypes';
import setDisplayName from 'recompose/setDisplayName';
import compose from 'recompose/compose';
import { Grid, Row, Col } from 'react-flexbox-grid';

export const CenterBlock = compose(
  setDisplayName('CenterBlock'),
  setPropTypes({
    fullwidth: PropTypes.bool,
    children: PropTypes.node
  })
)(({ fullwidth, children }) => (
  <Grid>
    <Row center='md' middle='md'>
      <Col md={ fullwidth ? 12 : 6 } sm={ 12 }>
        { children }
      </Col>
    </Row>
  </Grid>
));

export default CenterBlock;
