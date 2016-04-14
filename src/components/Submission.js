import React, { Component, PropTypes } from 'react';

import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Submission extends Component {
  render() {
    const {
      title,
      language,
      time,
      memory,
      result
    } = this.props;
    return (
      <Card>
        <CardText>
          <Grid>
            <Row>
              <Col xs={ 6 }>
                { title }
              </Col>
              <Col xs={ 2 } /> { /* Use for padding */ }
              <Col xs={ 1 } style={ result === 'AC' ? styles.pass : styles.noPass }>
                { result }
              </Col>
              <Col style={ styles.upperCase } xs={ 1 }>
                { language }
              </Col>
              <Col xs={ 1 }>
                { time } (s)
              </Col>
              <Col xs={ 1 }>
                { memory } (KB)
              </Col>
            </Row>
          </Grid>
        </CardText>
      </Card>
    );
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    quesUuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    memory: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired
  };
}

const styles = {
  upperCase: {
    textTransform: 'uppercase'
  },
  pass: {
    color: 'green'
  },
  noPass: {
    color: 'red'
  }
};

export default Submission;
