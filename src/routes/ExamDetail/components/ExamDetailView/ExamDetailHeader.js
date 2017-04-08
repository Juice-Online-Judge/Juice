import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bind} from 'decko'
import {Route} from 'react-router-dom'
import {Row, Col} from 'react-flexbox-grid'

import TextField from 'material-ui/TextField'
import CopyButton from 'components/CopyButton'
import Filter from './Filter'

class ExamDetailHeader extends Component {
  @bind getTextField(textField) {
    this.textField = textField
  }

  @bind handleFocus() {
    if (this.textField) {
      this.textField.select()
    }
  }

  render() {
    const {token, isSubmission} = this.props
    return (
      <Row middle='md'>
        <Route path='/exam/:examId/questions' component={ Filter } />
        <Col md={ 1 } mdOffset={ isSubmission ? 0 : 7 }>
          <span>Token: </span>
        </Col>
        <Col md={ 3 }>
          <TextField
            ref={ this.getTextField }
            name='token'
            onFocus={ this.handleFocus }
            value={ token || 'Unavailable' } />
        </Col>
        <Col md={ 1 }>
          <CopyButton text={ token } />
        </Col>
      </Row>
    )
  }

  static propTypes = {
    token: PropTypes.string,
    isSubmission: PropTypes.bool.isRequired
  };
}

export default ExamDetailHeader
