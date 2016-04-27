import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CardActions from 'material-ui/Card/CardActions';

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
          title={ question.get('title') } />
        <CardText>
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
