import React, {PropTypes} from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'
import setPropTypes from 'recompose/setPropTypes'

export const Inset = setPropTypes({
  children: PropTypes.node
})(({children}) => (
  <Grid>
    <Row>
      <Col xs={ 12 }>
        {children}
      </Col>
    </Row>
  </Grid>
))

export default Inset
