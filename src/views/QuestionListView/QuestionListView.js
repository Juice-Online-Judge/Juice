import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { actions as questionActions } from 'redux/modules/question';
import { actions as appActions } from 'redux/modules/app';
import createMaxPageSelector from 'redux/selectors/maxPageSelector';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import Inset from 'layouts/Inset';
import LoadingContainer from 'components/LoadingContainer';
import Question from 'components/Question';
import Pagination from 'components/Pagination';
import { RequestStatus } from 'lib/const';
import styles from 'lib/styles';

export class QuestionListView extends Component {
  componentDidMount() {
    const { query } = this.props.location;
    this.props.fetchQuestion(query);
  }

  componentWillReceiveProps(newProps) {
    const { query } = newProps.location;

    if (newProps.app.get('status') === RequestStatus.SUCCESS) {
      this.props.clearStatus();
    }

    this.props.fetchQuestion(query);
  }

  get questionList() {
    const { question } = this.props;
    return question.get('result').map((uuid) => {
      return (
        <Question uuid={ uuid } key={ uuid } />
      );
    });
  }

  render() {
    const { app, maxPage } = this.props;
    const { query } = this.props.location;
    const page = parseInt(query.page || 1);

    return (
      <LoadingContainer loading={ app.get('status') === RequestStatus.PENDING } >
        <Inset>
          { this.questionList }
        </Inset>
        <Pagination
          baseUrl='/'
          maxPage={ maxPage }
          current={ page } />
        <Link to='/questions/new'>
          <FloatingActionButton style={ styles.floatBtn } >
            <AddIcon />
          </FloatingActionButton>
        </Link>
      </LoadingContainer>
    );
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    maxPage: PropTypes.number.isRequired,
    fetchQuestion: PropTypes.func.isRequired,
    clearStatus: PropTypes.func.isRequired
  };
}

const maxPageSelector = createMaxPageSelector();

export default connect((state) => {
  return {
    question: state.question,
    app: state.app,
    maxPage: maxPageSelector(state.question)
  };
}, Object.assign({}, questionActions, appActions))(QuestionListView);
