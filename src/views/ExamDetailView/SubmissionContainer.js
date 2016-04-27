import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SubmissionList from 'components/SubmissionList';
import { fetchExamSubmissions } from 'redux/modules/submission';

class SubmissionContainer extends Component {
  componentDidMount() {
    const { examId, fetchExamSubmissions } = this.props;
    fetchExamSubmissions(examId);
  }

  render() {
    const { examId, submission } = this.props;
    return (
      <SubmissionList submission={ submission } examId={ examId } />
    );
  }

  static propTypes = {
    examId: PropTypes.func.isRequired,
    submission: PropTypes.object.isRequired,
    fetchExamSubmissions: PropTypes.func.isRequired
  };
}

export default connect((state) => ({
  submission: state.submission
}), { fetchExamSubmissions })(SubmissionContainer);
