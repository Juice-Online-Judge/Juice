import React, { Component, PropTypes } from 'react';

import Question from 'components/Question';

export class QuestionView extends Component {
  render() {
    const { uuid } = this.props.params;
    return (
      <Question uuid={ uuid } expanded />
    );
  }

  static propTypes = {
    params: PropTypes.object.isRequired
  };
}

export default QuestionView;
