import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

export class CenterBlock extends Component {
  render() {
    return (
      <Grid>
        <Row center='md' middle='md'>
          <Col md={ this.props.fullwidth ? 12 : 6 } sm={ 12 }>
            <div style={ styles.fullWidth }>
              { this.props.children }
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }

  static propTypes = {
    children: PropTypes.node,
    fullwidth: PropTypes.bool
  };
}

const styles = {
  fullWidth: {
    width: '100%'
  }
};

export default CenterBlock;
