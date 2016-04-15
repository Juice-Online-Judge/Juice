import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import IconButton from 'material-ui/IconButton';
import CodeIcon from 'material-ui/svg-icons/action/code';

@Radium
class Submission extends Component {
  render() {
    const {
      id,
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
          <Row middle='xs'>
            <Col xs={ 6 }>
              <Link to={ `/question/${quesUuid}` }>
                { title }
              </Link>
            </Col>
            <Col xs={ 1 } /> { /* Use for padding */ }
            <Col xs={ 1 }>
              <span style={ [result === 'AC' ? styles.pass : styles.noPass, styles.bold] }>
                { result }
              </span>
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
              <Link to={ `/submission/${id}/code` }>
                <IconButton tooltip='View Code'>
                  <CodeIcon />
                </IconButton>
              </Link>
            </Col>
          </Row>
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
  bold: {
    fontWeight: 'bold'
  },
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
