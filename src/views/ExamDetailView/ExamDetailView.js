import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import Inset from 'layouts/Inset';
import Question from 'components/Question';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import { actions as examActions } from 'redux/modules/exam';

class ExamDetailView extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    this.props.fetchExamQuestion(id);
    this.props.fetchExamToken(id);
  }

  @autobind
  handleFocus() {
    this.refs.textField.select();
  }

  render() {
    const { id } = this.props.params;
    const { question, exam } = this.props;
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
        <div>
          {
            question.get('result').map((uuid) => (
              <Question key={ uuid } examId={ id } uuid={ uuid } />
            ))
          }
        </div>
      </Inset>
    );
  }

  static propTypes = {
    question: PropTypes.object.isRequired,
    exam: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchExamToken: PropTypes.func.isRequired,
    fetchExamQuestion: PropTypes.func.isRequired
  }
}

export default connect((state) => ({ question: state.question, exam: state.exam }),
  examActions)(ExamDetailView);
