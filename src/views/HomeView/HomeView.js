import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { actions as questionActions } from 'redux/modules/question';

import Inset from 'components/Inset';
import Question from 'components/Question';
import CenterLoading from 'components/CenterLoading';
import { RequestStatus } from 'lib/const';

export class HomeView extends React.Component {
  componentDidMount() {
    this.props.fetchQuestion();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.question.get('status') === RequestStatus.SUCCESS) {
      this.props.clearStatus();
    }
  }

  get questionList() {
    const { question } = this.props;
    return question.get('uuids').map((uuid, idx) => {
      return (
        <Question uuid={ uuid } key={ idx } />
      );
    });
  }

  render() {
    const { question } = this.props;

    return (
      <div>
        <CenterLoading loading={ question.get('status') === RequestStatus.PENDING } />
        <Inset>
          { this.questionList }
        </Inset>
      </div>
    );
  }
}

HomeView.propTypes = {
  question: PropTypes.object.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired
};

export default connect((state) => {
  return { question: state.question };
}, questionActions)(HomeView);
