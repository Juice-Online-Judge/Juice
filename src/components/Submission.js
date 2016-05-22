import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { bind } from 'decko';

import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CodeIcon from 'material-ui/svg-icons/action/code';

export class Submission extends Component {
  @bind
  handleFilterQuestion() {
    const { quesUuid } = this.props;
    this.addFilter({ question: quesUuid });
  }

  @bind
  handleFilterUser() {
    const { userId } = this.props;
    this.addFilter({ user: userId });
  }

  addFilter(filter) {
    const { addFilter } = this.props;
    if (addFilter) {
      addFilter(filter);
    }
  }

  render() {
    const {
      id,
      addFilter,
      needReview,
      quesUuid,
      examId,
      title,
      language,
      username,
      time,
      memory,
      result
    } = this.props;
    const origQuesUrl = `/questions/${quesUuid}`;
    const quesUrl = examId ? `/exams/${examId}${origQuesUrl}` : origQuesUrl;
    const origSubUrl = `/submissions/${id}/code`;
    const subUrl = examId ? `/exams/${examId}${origSubUrl}` : origSubUrl;
    return (
      <Card>
        <CardText style={ styles.padding }>
          <Row middle='xs'>
            <Col xs={ 1 }>
              { id }
            </Col>
            <Col xs={ addFilter ? 4 : 5 }>
              <Link to={ quesUrl }>
                { title }
              </Link>
            </Col>
            <Col xs={ 1 }>
              { examId ? username : null }
            </Col>
            <Col xs={ 1 }>
              <span style={ [result === 'AC' ? styles.pass : styles.noPass, styles.bold] }>
                { result === 'AC' && needReview ? 'AC (need review)' : result || 'PENDING' }
              </span>
            </Col>
            <Col style={ styles.upperCase } xs={ 1 }>
              { language }
            </Col>
            <Col xs={ 1 }>
              { time || 'N/A' } s
            </Col>
            <Col xs={ 1 }>
              { memory || 'N/A' } MB
            </Col>
            <Col xs={ 1 }>
              <Link to={ subUrl }>
                <IconButton tooltip='View Code'>
                  <CodeIcon />
                </IconButton>
              </Link>
            </Col>
            {
              addFilter ? (
                <Col xs={ 1 }>
                  <IconMenu
                    iconButtonElement={
                      <IconButton> <MoreVertIcon /> </IconButton>
                    }
                    anchorOrigin={ styles.origin }
                    targetOrigin={ styles.origin } >
                    <MenuItem
                      primaryText='Filter by this question'
                      onTouchTap={ this.handleFilterQuestion } />
                    <MenuItem
                      primaryText='Filter by this user'
                      onTouchTap={ this.handleFilterUser } />
                  </IconMenu>
                </Col>
              ) : null
            }
          </Row>
        </CardText>
      </Card>
    );
  }

  static propTypes = {
    addFilter: PropTypes.func,
    id: PropTypes.number.isRequired,
    needReview: PropTypes.bool.isRequired,
    quesUuid: PropTypes.string.isRequired,
    userId: PropTypes.number,
    examId: PropTypes.string,
    title: PropTypes.string.isRequired,
    username: PropTypes.string,
    language: PropTypes.string.isRequired,
    time: PropTypes.string,
    memory: PropTypes.string,
    result: PropTypes.string
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
  origin: {
    horizontal: 'left',
    vertical: 'top'
  },
  padding: {
    padding: '0 16px'
  }
};

export default Radium(Submission);
