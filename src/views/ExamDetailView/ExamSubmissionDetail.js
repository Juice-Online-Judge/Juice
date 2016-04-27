import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SubmissionList from 'components/SubmissionList';
import { fetchExamSubmissions } from 'redux/modules/submission';
import { filterSubmissionSelector, addFilter } from 'redux/modules/submissionFilter';
import { createIsAdminSelector } from 'redux/modules/account';

class ExamSubmissionDetail extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    const { fetchExamSubmissions } = this.props;
    fetchExamSubmissions(id);
  }

  render() {
    const { id } = this.props.params;
    const { submission, admin, addFilter } = this.props;
    return (
      <SubmissionList
        submission={ submission }
        examId={ id }
        addFilter={ admin ? addFilter : null } />
    );
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    submission: PropTypes.object.isRequired,
    admin: PropTypes.bool.isRequired,
    fetchExamSubmissions: PropTypes.func.isRequired,
    addFilter: PropTypes.func.isRequired
  };
}

const isAdminSelector = createIsAdminSelector();

export default connect((state) => ({
  submission: filterSubmissionSelector(state),
  admin: isAdminSelector(state)
}), { fetchExamSubmissions, addFilter })(ExamSubmissionDetail);
