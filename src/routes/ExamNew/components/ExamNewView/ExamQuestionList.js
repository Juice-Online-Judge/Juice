import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bind} from 'decko'
import without from 'lodash/without'

import ExamQuestion from 'components/ExamQuestion'

class ExamQuestionList extends Component {
  @bind handleQuestionCheck (selected, uuid) {
    const {selectedQuestion} = this.props
    if (selected) {
      this.props.onChange(selectedQuestion.concat(uuid), uuid)
    } else {
      this.props.onChange(without(selectedQuestion, uuid), uuid)
    }
  }

  @bind handleRequestDetail (uuid) {
    this.props.onRequestDetail(uuid)
  }

  render () {
    const {question, selectedQuestion} = this.props
    return (
      <div>
        {question.get('result').map(uuid => {
          return (
            <ExamQuestion
              key={uuid}
              uuid={uuid}
              checked={selectedQuestion.includes(uuid)}
              onCheck={this.handleQuestionCheck}
              onRequestDetail={this.handleRequestDetail} />
          )
        })}
      </div>
    )
  }

  static propTypes = {
    question: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onRequestDetail: PropTypes.func.isRequired,
    selectedQuestion: PropTypes.array.isRequired
  }
}

export default ExamQuestionList
