import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Inset from 'layouts/Inset';
import LoadingContainer from 'components/LoadingContainer';
import SubmissionList from 'components/SubmissionList';

import { actions as submissionActions } from 'redux/modules/submission';

class SubmissionView extends Component {
  componentDidMount() {
    this.props.fetchSubmissions();
  }

  render() {
    const { submission } = this.props;
    return (
      <LoadingContainer>
        <Inset>
          <SubmissionList submission={ submission } />
        </Inset>
      </LoadingContainer>
    );
  }

  static propTypes = {
    submission: PropTypes.object.isRequired,
    fetchSubmissions: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ submission: state.submission }),
  submissionActions)(SubmissionView);
