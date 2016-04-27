import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

export class Inset extends Component {
  render() {
    return (
      <Grid>
        <Row center='sm'>
          <Col sm={ 12 }>
            <Row start='sm'>
              <Col sm={ 12 }>
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
