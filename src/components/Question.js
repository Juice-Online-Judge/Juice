import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CardActions from 'material-ui/Card/CardActions';

import TitleCard from './TitleCard';
import SubmitCode from './SubmitCode';

import { actions as questionActions, questionSelector } from 'redux/modules/question';
import commonStyles from 'lib/styles';

export class Question extends Component {
  componentDidMount() {
    const { expanded } = this.props;
    if (expanded) {
      this.fetchQuestionDetail();
    }
  }

  fetchQuestionDetail() {
    const { question, uuid } = this.props;
    if (question && question.get('detail')) {
      return;
    }

    this.props.fetchQuestionDetail(uuid);
  }

  render() {
    const { uuid, question, expanded, examId } = this.props;

    if (expanded) {
      return (
        <Card>
          <CardTitle
            title={ question.get('title') } />
          <CardText style={ styles.textContainer }>
            <div style={ styles.textWrap }>
              { question.get('description') }
            </div>
          </CardText>
          <CardActions>
            <SubmitArea examId={ examId } uuid={ uuid } />
          </CardActions>
        </Card>
      );
    } else {
      const quesUrl = `/questions/${uuid}`;
      const url = examId ? `/exams/${examId}${quesUrl}` : quesUrl;
      return (
        <Link style={ commonStyles.noUnderline } to={ url }>
          <TitleCard
            title={ question.get('title') } />
        </Link>
      );
    }
  }

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    examId: PropTypes.number,
    question: PropTypes.object,
    fetchQuestionDetail: PropTypes.func.isRequired,
    expanded: PropTypes.bool
  };
}

export default connect((state, props) => ({
  question: questionSelector(state, props)
}), questionActions)(Question);

class SubmitArea extends Component {
  render() {
    return (
      <SubmitCode
        examId={ this.props.examId }
        uuid={ this.props.uuid } />
    );
  }

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    examId: PropTypes.number
  };
}

const styles = {
  iconBtn: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '4px'
  },
  textContainer: {
    position: 'relative'
  },
  textWrap: {
    marginRight: '54px'
  }
};
