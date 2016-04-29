import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { Row, Col } from 'react-flexbox-grid';
import {
    fetchCode,
    fetchSubmission,
    codeSelector,
    submissionSelector,
    needReviewSelector,
    patchSubmissionCorrectness
 } from 'redux/modules/submission';
import { createIsAdminSelector } from 'redux/modules/account';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Inset from 'layouts/Inset';
import CodePane from 'components/CodePane';
import DownloadButton from 'components/DownloadButton';

class CodeView extends Component {
  componentWillMount() {
    const { id } = this.props.params;
    this.props.fetchSubmission(id);
    this.props.fetchCode(id);
  }

  @autobind
  handleScoreChange({ target: { value } }) {
    this.setState({ correctness: value });
  }

  @autobind
  handleSetScore(event) {
    const { id } = this.props.params;
    this.props.patchSubmissionCorrectness(id, this.state.score);
  }

  render() {
    const { id, examId } = this.props.params;
    const { admin, submission, code, needReview } = this.props;
    const lang = submission.get('language');
    const isFail = submission.getIn(['judge', 'result'], 'AC') !== 'AC';
    const judgeMessage = submission.getIn(['judge', 'judge_message']);
    const ext = lang === 'c++' ? 'cpp' : lang;
    return (
      <Inset>
        <Row middle='md' end='md'>
          {
            examId && admin && needReview ? (
              <Col md={ 4 }>
                <Row middle='md'>
                  <Col md={ 6 }>
                    <TextField
                      onChange={ this.handleScoreChange }
                      floatingLabelText='Score'
                      value={ this.state.correctness } />
                  </Col>
                  <Col md={ 6 }>
                    <FlatButton
                      label='Set score'
                      onTouchTap={ this.handleSetScore } />
                  </Col>
                </Row>
              </Col>
            ) : null
          }
          <Col md={ 3 }>
            <DownloadButton label='Download Code' text={ code } filename={ `submission${id}.${ext}` } />
          </Col>
        </Row>
        {
          isFail ? (
            <div>
              <div>Error message:</div>
              <CodePane code={ judgeMessage } lang='txt' />
            </div>
          ) : null
        }
        <div>Code:</div>
        <CodePane code={ code } lang={ lang } />
      </Inset>
    );
  }

  state = {
    correctness: ''
  };

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

const isAdminSelector = createIsAdminSelector();
export default connect((state, props) => ({
  code: codeSelector(state),
  submission: submissionSelector(state, props),
  admin: isAdminSelector(state),
  needReview: needReviewSelector(state, props) }),
  { fetchCode, fetchSubmission, patchSubmissionCorrectness })(CodeView);
