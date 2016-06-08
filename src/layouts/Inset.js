import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

export class Inset extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={ 12 }>
            { this.props.children }
          </Col>
        </Row>
      </Grid>
    )
  }

  static propTypes = {
    children: PropTypes.node
  };
}

export default Inset
