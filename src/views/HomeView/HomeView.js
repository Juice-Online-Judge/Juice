import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { actions as questionActions } from 'redux/modules/question';

import Inset from 'layouts/Inset';
import LoadingContainer from 'components/LoadingContainer';
import Question from 'components/Question';
import Pagination from 'components/Pagination';
import { RequestStatus } from 'lib/const';

export class HomeView extends React.Component {
  componentDidMount() {
    const { query } = this.props.location;
    this.props.fetchQuestion(query);
  }

  componentWillReceiveProps(newProps) {
    const { query } = newProps.location;

    if (newProps.question.get('status') === RequestStatus.SUCCESS) {
      this.props.clearStatus();
    }

    this.props.fetchQuestion(query);
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
    const { query } = this.props.location;
    const page = parseInt(query.page || 1);

    return (
      <LoadingContainer loading={ question.get('status') === RequestStatus.PENDING } >
        <Inset>
          { this.questionList }
        </Inset>
        <Pagination
          baseUrl='/'
          maxPage={ Math.ceil(question.get('total') / 10) }
          current={ page } />
      </LoadingContainer>
    );
  }
}

HomeView.propTypes = {
  location: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired
};

export default connect((state) => {
  return { question: state.question };
}, questionActions)(HomeView);
