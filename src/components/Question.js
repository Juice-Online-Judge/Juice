import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CardActions from 'material-ui/Card/CardActions';
import { Row, Col } from 'react-flexbox-grid';

import SubmitCode from './SubmitCode';

import { fetchQuestionDetail, questionSelector } from 'redux/modules/question';

export class Question extends Component {
  componentDidMount() {
    this.fetchQuestionDetail();
  }

  fetchQuestionDetail() {
    const { question, uuid } = this.props;
    if (question && question.get('detail')) {
      return;
    }

    this.props.fetchQuestionDetail(uuid);
  }

  render() {
    const { question } = this.props;

    return (
      <Card>
        <CardTitle
          title={ question.get('title') }
          subtitle={ `uuid: ${question.get('uuid')}` } />
        <CardText>
          <Row>
            <Col mdOffset={ 9 } md={ 2 } xs={ 12 }>
              Limit:
            </Col>
          </Row>
          <Row end='md'>
            <Col md={ 4 } xs={ 12 }>
              Time: { question.getIn(['judge', 'restrictions', 'time']) }(s)
              Memory: { question.getIn(['judge', 'restrictions', 'memory']) }(MB)
              File: { question.getIn(['judge', 'restrictions', 'file']) }
            </Col>
          </Row>
        </CardText>
        <CardText>
          <div>
            Description:
          </div>
          <div>
            { question.get('description') }
          </div>
        </CardText>
        <CardActions>
          <SubmitCode
            examId={ this.props.examId }
            uuid={ this.props.uuid } />
        </CardActions>
      </Card>
    );
  }

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    examId: PropTypes.string,
    question: PropTypes.object,
    fetchQuestionDetail: PropTypes.func.isRequired
  };
}

export default connect((state, props) => ({
  question: questionSelector(state, props)
}), { fetchQuestionDetail })(Question);
