import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Inset from 'layouts/Inset';
import LoadingContainer from 'components/LoadingContainer';
import Submission from 'components/Submission';

import { actions as submissionActions } from 'redux/modules/submission';
import { RequestStatus } from 'lib/const';

class SubmissionView extends Component {
  componentDidMount() {
    this.props.fetchSubmissions();
  }

  get submissions() {
    const { submission } = this.props;
    const entities = submission.getIn(['entities', 'submission']);
    return submission.get('result').map((idNum) => {
      const id = `${idNum}`;
      return (
        <Submission
          key={ entities.getIn([id, 'id']) }
          id={ entities.getIn([id, 'id']) }
          quesUuid={ entities.getIn([id, 'question', 'uuid']) }
          title={ entities.getIn([id, 'question', 'title']) }
          language={ entities.getIn([id, 'language']) }
          result={ entities.getIn([id, 'judge', 'result']) }
          time={ entities.getIn([id, 'judge', 'time']) }
          memory={ entities.getIn([id, 'judge', 'memory']) } />
      );
    });
  }

  render() {
    const { app } = this.props;
    const loading = app.get('status') === RequestStatus.PENDING;
    return (
      <LoadingContainer loading={ loading }>
        <Inset>
          { this.submissions }
        </Inset>
      </LoadingContainer>
    );
  }

  static propTypes = {
    app: PropTypes.object.isRequired,
    submission: PropTypes.object.isRequired,
    fetchSubmissions: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ submission: state.submission, app: state.app }),
  submissionActions)(SubmissionView);
