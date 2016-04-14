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
    return submission.get('submissions').map((data) => {
      return (
        <Submission
          key={ data.get('id') }
          id={ data.get('id') }
          quesUuid={ data.getIn(['question', 'uuid']) }
          title={ data.getIn(['question', 'title']) }
          language={ data.get('language') }
          result={ data.getIn(['judge', 'result']) }
          time={ data.getIn(['judge', 'time']) }
          memory={ data.getIn(['judge', 'memory']) } />
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
