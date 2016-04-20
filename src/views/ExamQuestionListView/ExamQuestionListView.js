import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Inset from 'layouts/Inset';
import Question from 'components/Question';
import { Row, Col } from 'react-flexbox-grid';
import { actions as examActions } from 'redux/modules/exam';

class ExamQuestionListView extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    this.props.fetchExamQuestion(id);
    this.props.fetchExamToken(id);
  }

  render() {
    const { id } = this.props.params;
    const { question, exam } = this.props;
    return (
      <Inset>
        <Row>
          <Col md={ 2 } mdOffset={ 10 }>
            Token: { exam.getIn(['tokens', `${id}`], 'Unavailable') }
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
  examActions)(ExamQuestionListView);
