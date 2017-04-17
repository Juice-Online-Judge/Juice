import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SubmissionList from 'components/SubmissionList'
import {fetchExamSubmissions} from 'redux/modules/submission'
import {
  filterSubmissionSelector,
  addFilter
} from 'redux/modules/submissionFilter'
import {createIsAdminSelector} from 'redux/modules/account'

class ExamSubmissionDetail extends Component {
  componentDidMount() {
    const {examId, fetchExamSubmissions} = this.props
    fetchExamSubmissions(examId)
    this.interval = setInterval(() => {
      fetchExamSubmissions(examId)
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const {examId, submission, admin, addFilter} = this.props
    return (
      <div>
        <div>This page will update every few seconds</div>
        <SubmissionList
          submission={ submission }
          examId={ examId }
          addFilter={ admin ? addFilter : null } />
      </div>
    )
  }

  static propTypes = {
    examId: PropTypes.string.isRequired,
    submission: PropTypes.object.isRequired,
    admin: PropTypes.bool.isRequired,
    fetchExamSubmissions: PropTypes.func.isRequired,
    addFilter: PropTypes.func.isRequired
  }
}

const isAdminSelector = createIsAdminSelector()

export default connect(
  (state, {match: {params: {examId}}}) => ({
    submission: filterSubmissionSelector(state),
    admin: isAdminSelector(state),
    examId
  }),
  {fetchExamSubmissions, addFilter}
)(ExamSubmissionDetail)
