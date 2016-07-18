import CodeView from '../../components/CodeView'
import { connect } from 'react-redux'

import {
    fetchCode,
    fetchSubmission,
    codeSelector,
    submissionSelector,
    needReviewSelector,
    patchSubmissionCorrectness
 } from 'redux/modules/submission'
import { createIsAdminSelector } from 'redux/modules/account'

const isAdminSelector = createIsAdminSelector()

export default connect((state, props) => ({
  code: codeSelector(state),
  submission: submissionSelector(state, props),
  admin: isAdminSelector(state),
  needReview: needReviewSelector(state, props),
  id: props.params.id,
  examId: props.params.examId
}), { fetchCode, fetchSubmission, patchSubmissionCorrectness })(CodeView)
