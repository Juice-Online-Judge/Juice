import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SubmissionList from 'components/SubmissionList';
import { fetchExamSubmissions } from 'redux/modules/submission';

class ExamSubmissionDetail extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    const { fetchExamSubmissions } = this.props;
    fetchExamSubmissions(id);
  }

  render() {
    const { id } = this.props.params;
    const { submission } = this.props;
    return (
      <SubmissionList submission={ submission } examId={ id } />
    );
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    submission: PropTypes.object.isRequired,
    fetchExamSubmissions: PropTypes.func.isRequired
  };
}

export default connect((state) => ({
  submission: state.submission
}), { fetchExamSubmissions })(ExamSubmissionDetail);
