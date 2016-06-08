import React, { Component, PropTypes } from 'react'

import Question from 'components/Question'
import Inset from 'layouts/Inset'

import redirectNotFound from 'lib/redirectNotFound'

export class QuestionView extends Component {
  render() {
    const { uuid } = this.props.params
    return (
      <Inset>
        <Question uuid={ uuid } />
      </Inset>
    )
  }

  static propTypes = {
    params: PropTypes.object.isRequired
  };
}

export default redirectNotFound(QuestionView)
