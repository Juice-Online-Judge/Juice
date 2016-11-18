import React, { Component, PropTypes } from 'react'

import { Row, Col } from 'react-flexbox-grid'
import Inset from 'layouts/Inset'
import Prism from 'components/Prism'
import DownloadButton from 'components/DownloadButton'
import SetScoreButton from './SetScoreButton'
import ErrorMessage from './ErrorMessage'

class CodeView extends Component {
  componentWillMount() {
    this.props.fetchCode()
  }

  render() {
    const { id } = this.props
    const { canReview, submission, code, needReview, patchCorrectness } = this.props
    const lang = submission.get('language')
    const ext = lang === 'c++' ? 'cpp' : lang
    const isFail = submission.getIn(['judge', 'result'], 'AC') !== 'AC'
    const judgeMessage = submission.getIn(['judge', 'judge_message'])

    return (
      <Inset>
        <Row middle='md' end='md'>
          <SetScoreButton
            needReview={ needReview && canReview }
            patchCorrectness={ patchCorrectness } />
          <Col md={ 3 }>
            <DownloadButton
              label='Download Code'
              text={ code }
              filename={ `submission${id}.${ext}` } />
          </Col>
        </Row>
        <ErrorMessage
          isFail={ isFail }
          judgeMessage={ judgeMessage } />
        <div>Code:</div>
        <Prism linenumber code={ code } lang={ lang } />
      </Inset>
    )
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    submission: PropTypes.object.isRequired,
    needReview: PropTypes.bool.isRequired,
    canReview: PropTypes.bool.isRequired,
    patchCorrectness: PropTypes.func.isRequired,
    fetchCode: PropTypes.func.isRequired
  };
}

export default CodeView
