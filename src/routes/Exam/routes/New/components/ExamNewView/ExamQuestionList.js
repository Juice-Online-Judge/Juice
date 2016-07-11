import React, { PropTypes, Component } from 'react'
import { bind } from 'decko'
import concat from 'lodash/concat'
import without from 'lodash/without'

import ExamQuestion from 'components/ExamQuestion'

class ExamQuestionList extends Component {
  @bind
  handleQuestionCheck(selected, uuid) {
    const { selectedQuestion } = this.props
    if (selected) {
      this.props.onChange(concat(selectedQuestion, uuid), uuid)
    } else {
      this.props.onChange(without(selectedQuestion, uuid), uuid)
    }
  }

  @bind
  handleRequestDetail(uuid) {
    this.props.onRequestDetail(uuid)
  }

  render() {
    const { question, selectedQuestion } = this.props
    return (
      <div>
        {
          question.get('result').map((uuid) => {
            return (
              <ExamQuestion
                key={ uuid }
                uuid={ uuid }
                checked={ selectedQuestion.indexOf(uuid) !== -1 }
                onCheck={ this.handleQuestionCheck }
                onRequestDetail={ this.handleRequestDetail } />
            )
          })
        }
      </div>
    )
  }

  static propTypes = {
    app: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    fetchQuestion: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onRequestDetail: PropTypes.func.isRequired,
    selectedQuestion: PropTypes.array.isRequired
  };
}

export default ExamQuestionList