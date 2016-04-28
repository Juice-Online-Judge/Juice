import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { Row, Col } from 'react-flexbox-grid';
import { fetchCode, fetchSubmission, patchSubmissionCorrectness } from 'redux/modules/submission';
import { createIsAdminSelector } from 'redux/modules/account';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Inset from 'layouts/Inset';
import CodePane from 'components/CodePane';
import DownloadButton from 'components/DownloadButton';

class CodeView extends Component {
  componentWillMount() {
    const { id } = this.props.params;
    const { submission } = this.props;
    this.props.fetchSubmission(id);
    this.props.fetchCode(id);
    this.setState({
      correctness: submission.getIn(['entities', 'submission', `${id}`, 'judge', 'correctness'], 0)
    });
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
    const { admin, submission } = this.props;
    const code = submission.get('code');
    const lang = submission.getIn(['entities', 'submission', `${id}`, 'language']);
    const ext = lang === 'c++' ? 'cpp' : lang;
    return (
      <Inset>
        <Row middle='md' end='md'>
          {
            examId && admin ? (
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
        <CodePane code={ code } lang={ lang } />
      </Inset>
    );
  }

  state = {
    correctness: null
  };

  static propTypes = {
    params: PropTypes.object.isRequired,
    admin: PropTypes.bool.isRequired,
    submission: PropTypes.object.isRequired,
    patchSubmissionCorrectness: PropTypes.func.isRequired,
    fetchSubmission: PropTypes.func.isRequired,
    fetchCode: PropTypes.func.isRequired
  };
}

const isAdminSelector = createIsAdminSelector();
export default connect((state) => ({ submission: state.submission, admin: isAdminSelector(state) }),
  { fetchCode, fetchSubmission, patchSubmissionCorrectness })(CodeView);
