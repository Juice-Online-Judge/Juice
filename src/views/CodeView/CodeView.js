import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Row, Col } from 'react-flexbox-grid'
import {
    fetchCode,
    fetchSubmission,
    codeSelector,
    submissionSelector,
    needReviewSelector,
    patchSubmissionCorrectness
 } from 'redux/modules/submission'
import { createIsAdminSelector } from 'redux/modules/account'
import Inset from 'layouts/Inset'
import CodePane from 'components/CodePane'
import DownloadButton from 'components/DownloadButton'
import SetScoreButton from './SetScoreButton'
import ErrorMessage from './ErrorMessage'

class CodeView extends Component {
  componentWillMount() {
    const { id } = this.props.params
    this.props.fetchSubmission(id)
    this.props.fetchCode(id)
  }

  render() {
    const { id, examId } = this.props.params
    const { admin, submission, code, needReview, patchSubmissionCorrectness } = this.props
    const lang = submission.get('language')
    const ext = lang === 'c++' ? 'cpp' : lang
    return (
      <Inset>
        <Row middle='md' end='md'>
          <SetScoreButton
            id={ id }
            admin={ admin }
            examId={ examId }
            needReview={ needReview }
            patchSubmissionCorrectness={ patchSubmissionCorrectness } />
          <Col md={ 3 }>
            <DownloadButton label='Download Code' text={ code } filename={ `submission${id}.${ext}` } />
          </Col>
        </Row>
        <ErrorMessage submission={ submission } />
        <div>Code:</div>
        <CodePane code={ code } lang={ lang } />
      </Inset>
    )
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    admin: PropTypes.bool.isRequired,
    code: PropTypes.string.isRequired,
    submission: PropTypes.object.isRequired,
    needReview: PropTypes.bool.isRequired,
    patchSubmissionCorrectness: PropTypes.func.isRequired,
    fetchSubmission: PropTypes.func.isRequired,
    fetchCode: PropTypes.func.isRequired
  };
}

const isAdminSelector = createIsAdminSelector()

export default connect((state, props) => ({
  code: codeSelector(state),
  submission: submissionSelector(state, props),
  admin: isAdminSelector(state),
  needReview: needReviewSelector(state, props)
}), { fetchCode, fetchSubmission, patchSubmissionCorrectness })(CodeView)
