import React, { Component, PropTypes } from 'react';

import Inset from 'layouts/Inset';
import Question from 'components/Question';

class ExamQuestionView extends Component {
  render() {
    const { examId, uuid } = this.props.params;
    return (
      <Inset>
        <Question
          expanded
          examId={ examId }
          uuid={ uuid } />
      </Inset>
    );
  }

  static propTypes = {
    params: PropTypes.object.isRequired
  };
}

export default ExamQuestionView;
