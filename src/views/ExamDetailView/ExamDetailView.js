import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import Inset from 'layouts/Inset';
import TextField from 'material-ui/TextField';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import QuestionList from './QuestionList';
import SubmissionList from 'components/SubmissionList';
import { Row, Col } from 'react-flexbox-grid';
import { actions as examActions } from 'redux/modules/exam';
import { fetchExamSubmissions } from 'redux/modules/submission';

class ExamDetailView extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    this.props.fetchExamQuestion(id);
    this.props.fetchExamSubmissions(id);
    this.props.fetchExamToken(id);
  }

  @autobind
  handleFocus() {
    this.refs.textField.select();
  }

  isManager() {
    // For testing TODO: replace this with permission check
    return true;
  }

  get detailContent() {
    const { id } = this.props.params;
    const { question, submission } = this.props;
    if (this.isManager()) {
      return (
        <Tabs>
          <Tab label='Question'>
            <QuestionList question={ question } examId={ id } />
          </Tab>
          <Tab label='Submission'>
            <SubmissionList submission={ submission } />
          </Tab>
        </Tabs>
      );
    } else {
      return (
        <QuestionList question={ question } examId={ id } />
      );
    }
  }

  render() {
    const { id } = this.props.params;
    const { exam } = this.props;
    return (
      <Inset>
        <Row middle='md'>
          <Col md={ 1 } mdOffset={ 8 } >
            <span>Token: </span>
          </Col>
          <Col md={ 3 } >
            <TextField
              ref='textField'
              name='token'
              onFocus={ this.handleFocus }
              value={ exam.getIn(['tokens', `${id}`], 'Unavailable') } />
          </Col>
        </Row>
        { this.detailContent }
      </Inset>
    );
  }

  static propTypes = {
    question: PropTypes.object.isRequired,
    submission: PropTypes.object.isRequired,
    exam: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchExamToken: PropTypes.func.isRequired,
    fetchExamQuestion: PropTypes.func.isRequired,
    fetchExamSubmissions: PropTypes.func.isRequired
  }
}

export default connect((state) => ({
  question: state.question,
  exam: state.exam,
  submission: state.submission
}), { ...examActions, fetchExamSubmissions })(ExamDetailView);
