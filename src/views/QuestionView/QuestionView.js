import React, { Component, PropTypes } from 'react';

import Question from 'components/Question';
import Inset from 'layouts/Inset';

export class QuestionView extends Component {
  render() {
    const { uuid } = this.props.params;
    return (
      <Inset>
        <Question uuid={ uuid } expanded />
      </Inset>
    );
  }

  static propTypes = {
    params: PropTypes.object.isRequired
  };
}

export default QuestionView;
