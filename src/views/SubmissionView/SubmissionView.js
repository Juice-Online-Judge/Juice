import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Inset from 'layouts/Inset';
import LoadingContainer from 'components/LoadingContainer';
import SubmissionList from 'components/SubmissionList';

import { actions as submissionActions } from 'redux/modules/submission';
import { RequestStatus } from 'lib/const';

class SubmissionView extends Component {
  componentDidMount() {
    this.props.fetchSubmissions();
  }

  get submissions() {
  }

  render() {
    const { app, submission } = this.props;
    const loading = app.get('status') === RequestStatus.PENDING;
    return (
      <LoadingContainer loading={ loading }>
        <Inset>
          <SubmissionList submission={ submission } />
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
