import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bind} from 'decko'

import {Row, Col} from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

class SetScoreButton extends Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.needReview !== this.props.needReview
  }

  @bind handleScoreChange ({target: {value}}) {
    this.correctness = value
  }

  @bind handleSetScore (event) {
    this.props.patchCorrectness(this.correctness)
  }

  render () {
    const {needReview} = this.props
    if (!needReview) {
      return null
    }

    return (
      <Col md={4}>
        <Row middle='md'>
          <Col md={6}>
            <TextField
              onChange={this.handleScoreChange}
              floatingLabelText='Score' />
          </Col>
          <Col md={6}>
            <FlatButton label='Set score' onTouchTap={this.handleSetScore} />
          </Col>
        </Row>
      </Col>
    )
  }

  correctness = ''

  static propTypes = {
    needReview: PropTypes.bool,
    patchCorrectness: PropTypes.func.isRequired
  }
}

export default SetScoreButton
