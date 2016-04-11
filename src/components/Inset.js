import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

export class Inset extends Component {
  render() {
    return (
      <Grid>
        <Row center='md'>
          <Col md={ 11 } sm={ 12 }>
            <Row start='md'>
              <Col md={ 12 } sm={ 12 }>
                { this.props.children }
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }

  static propTypes = {
    children: PropTypes.node
  };
}

export default Inset;
