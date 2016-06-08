import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

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
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Inset from 'layouts/Inset'
import CodePane from 'components/CodePane'
import DownloadButton from 'components/DownloadButton'

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
  needReview: needReviewSelector(state, props) }),
  { fetchCode, fetchSubmission, patchSubmissionCorrectness })(CodeView)

class SetScoreButton extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.needReview !== this.props.needReview
  }

  @bind
  handleScoreChange({ target: { value } }) {
    this.correctness = value
  }

  @bind
  handleSetScore(event) {
    const { id } = this.props
    this.props.patchSubmissionCorrectness(id, this.correctness)
  }

  render() {
    const { examId, admin, needReview } = this.props
    if (!examId || !admin || !needReview) {
      return null
    }

    return (
      <Col md={ 4 }>
        <Row middle='md'>
          <Col md={ 6 }>
            <TextField
              onChange={ this.handleScoreChange }
              floatingLabelText='Score' />
          </Col>
          <Col md={ 6 }>
            <FlatButton
              label='Set score'
              onTouchTap={ this.handleSetScore } />
          </Col>
        </Row>
      </Col>
    )
  }

  correctness = '';

  static propTypes = {
    id: PropTypes.string.isRequired,
    examId: PropTypes.string,
    admin: PropTypes.bool.isRequired,
    needReview: PropTypes.bool,
    patchSubmissionCorrectness: PropTypes.func.isRequired
  };
}

const ErrorMessage = compose(
  setDisplayName('ErrorMessage'),
  setPropTypes({
    submission: PropTypes.object.isRequired
  })
)(({ submission }) => {
  const isFail = submission.getIn(['judge', 'result'], 'AC') !== 'AC'
  if (!isFail) {
    return null
  }

  const judgeMessage = submission.getIn(['judge', 'judge_message'])

  return (
    <div>
      <div>Error message:</div>
      <CodePane code={ judgeMessage } lang='txt' />
    </div>
  )
})
