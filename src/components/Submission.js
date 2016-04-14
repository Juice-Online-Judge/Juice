import React, { Component, PropTypes } from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import IconButton from 'material-ui/lib/icon-button';
import CodeIcon from  'material-ui/lib/svg-icons/action/code';

class Submission extends Component {
  render() {
    const {
      quesUuid,
      title,
      language,
      time,
      memory,
      result
    } = this.props;
    return (
      <Card>
        <CardText style={ styles.padding }>
          <Grid>
            <Row middle='xs'>
              <Col xs={ 6 }>
                <Link to={ `/question/${quesUuid}` }>
                  { title }
                </Link>
              </Col>
              <Col xs={ 1 } /> { /* Use for padding */ }
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
              <Col xs={ 1 }>
                <IconButton tooltip='View Code'>
                  <CodeIcon />
                </IconButton>
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
  },
  padding: {
    padding: '0 16px'
  }
};

export default Submission;
