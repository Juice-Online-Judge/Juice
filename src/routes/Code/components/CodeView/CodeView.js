import React, { Component, PropTypes } from 'react'

import { Row, Col } from 'react-flexbox-grid'
import Inset from 'layouts/Inset'
import CodePane from 'components/CodePane'
import DownloadButton from 'components/DownloadButton'
import SetScoreButton from './SetScoreButton'
import ErrorMessage from './ErrorMessage'

class CodeView extends Component {
  componentWillMount() {
    const { id } = this.props
    this.props.fetchSubmission(id)
    this.props.fetchCode(id)
  }

  render() {
    const { id, examId } = this.props
    const { admin, submission, code, needReview, patchSubmissionCorrectness } = this.props
    const lang = submission.get('language')
    const ext = lang === 'c++' ? 'cpp' : lang
    const isFail = submission.getIn(['judge', 'result'], 'AC') !== 'AC'
    const judgeMessage = submission.getIn(['judge', 'judge_message'])

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
        <ErrorMessage
          isFail={ isFail }
          judgeMessage={ judgeMessage } />
        <div>Code:</div>
        <CodePane code={ code } lang={ lang } />
      </Inset>
    )
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    examId: PropTypes.string,
    admin: PropTypes.bool.isRequired,
    code: PropTypes.string.isRequired,
    submission: PropTypes.object.isRequired,
    needReview: PropTypes.bool.isRequired,
    patchSubmissionCorrectness: PropTypes.func.isRequired,
    fetchSubmission: PropTypes.func.isRequired,
    fetchCode: PropTypes.func.isRequired
  };
}

export default CodeView
