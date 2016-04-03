import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { actions as questionActions } from 'redux/modules/question';

import Question from 'components/Question';
import CenterLoading from 'components/CenterLoading';

export class HomeView extends React.Component {
  componentDidMount() {
    this.props.fetchQuestion();
  }

  get questionList() {
    const { question } = this.props;
    if (question.get('loading')) {
      return (
        <CenterLoading loading />
      );
    } else {
      return question.get('uuids').map((uuid, idx) => {
        return (
          <Question uuid={ uuid } key={ idx } />
        );
      });
    }
  }

  render() {
    return (
      <div>
        { this.questionList }
      </div>
    );
  }
}

HomeView.propTypes = {
  question: PropTypes.object.isRequired,
  fetchQuestion: PropTypes.func.isRequired
};

export default connect((state) => {
  return { question: state.question };
}, questionActions)(HomeView);
