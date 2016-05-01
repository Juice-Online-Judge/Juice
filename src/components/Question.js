import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CardActions from 'material-ui/Card/CardActions';
import Markdown from 'react-markdown';

import SubmitCode from './SubmitCode';

import { fetchQuestionDetail, questionSelector } from 'redux/modules/question';
import { fetchExamQuestion } from 'redux/modules/exam';

export class Question extends Component {
  componentDidMount() {
    this.fetchQuestionDetail();
  }

  fetchQuestionDetail() {
    const { question, uuid, examId } = this.props;
    if (question && question.get('detail')) {
      return;
    }

    if (examId) {
      // It an exam's question.
      this.props.fetchExamQuestion(examId);
    } else {
      this.props.fetchQuestionDetail(uuid, { force: true });
    }
  }

  render() {
    const { question } = this.props;

    return (
      <Card>
        <CardTitle
          title={ question.get('title') }
          subtitle={ `uuid: ${question.get('uuid')}` } />
        <CardText>
          <div>
            Time limit: { question.getIn(['judge', 'restriction', 'time']) } s
          </div>
          <div>
            Memory limit: { question.getIn(['judge', 'restriction', 'memory']) } MB
          </div>
          <div>
            File limit: { question.getIn(['judge', 'restriction', 'file']) }
          </div>
        </CardText>
        <CardText>
          <Markdown escapeHtml source={ question.get('description', '') } />
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
    fetchQuestionDetail: PropTypes.func.isRequired,
    fetchExamQuestion: PropTypes.func.isRequired
  };
}

export default connect((state, props) => ({
  question: questionSelector(state, props)
}), { fetchQuestionDetail, fetchExamQuestion })(Question);
