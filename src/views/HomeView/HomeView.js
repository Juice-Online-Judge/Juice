import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { actions as questionActions } from 'redux/modules/question';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';

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
        <Link to='/question/new'>
          <FloatingActionButton style={ styles.floatBtn } >
            <AddIcon />
          </FloatingActionButton>
        </Link>
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

const styles = {
  floatBtn: {
    position: 'fixed',
    right: '20px',
    bottom: '10px'
  }
};
