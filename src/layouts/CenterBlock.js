import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

export class Inset extends Component {
  render() {
    return (
      <Grid>
        <Row center='md' middle='md'>
          <Col md={ 6 } sm={ 12 }>
            <div style={ styles.fullWidth }>
              { this.props.children }
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }

  static propTypes = {
    children: PropTypes.node
  };
}

const styles = {
  fullWidth: {
    width: '100%'
  }
};

export default Inset;
