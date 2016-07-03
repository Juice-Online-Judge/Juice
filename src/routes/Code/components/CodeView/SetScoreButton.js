import React, { PropTypes, Component } from 'react'
import { bind } from 'decko'

import { Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

class SetScoreButton extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.needReview !== this.props.needReview
  }

  @bind
  handleScoreChange({ target: { value } }) {
    this.correctness = value
  }

  @bind
  handleSetScore(event) {
    const { id } = this.props
    this.props.patchSubmissionCorrectness(id, this.correctness)
  }

  render() {
    const { examId, admin, needReview } = this.props
    if (!examId || !admin || !needReview) {
      return null
    }

    return (
      <Col md={ 4 }>
        <Row middle='md'>
          <Col md={ 6 }>
            <TextField
              onChange={ this.handleScoreChange }
              floatingLabelText='Score' />
          </Col>
          <Col md={ 6 }>
            <FlatButton
              label='Set score'
              onTouchTap={ this.handleSetScore } />
          </Col>
        </Row>
      </Col>
    )
  }

  correctness = '';

  static propTypes = {
    id: PropTypes.string.isRequired,
    examId: PropTypes.string,
    admin: PropTypes.bool.isRequired,
    needReview: PropTypes.bool,
    patchSubmissionCorrectness: PropTypes.func.isRequired
  };
}

export default SetScoreButton
