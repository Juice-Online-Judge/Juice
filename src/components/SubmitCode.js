import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'
import {bind} from 'decko'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

import FileArea from './FileArea'
import Label from './Label'
import MessageContainer from 'containers/MessageContainer'

import {submitCode} from 'redux/modules/submission'

export class SubmitCode extends Component {
  @bind handleLanguageChange(_event, _index, value) {
    this.setState({language: value})
  }

  @bind handleCodeChange(content) {
    this.setState({code: content.code})
  }

  @bind handleSubmit() {
    const {uuid, examId} = this.props
    this.props.submitCode({
      uuid,
      examId,
      ...this.state
    })
  }

  @bind handleClose() {
    this.props.goBack()
  }

  render() {
    return (
      <MessageContainer onRequestClose={ this.handleClose }>
        <Label label='Language: ' />
        <SelectField
          style={ styles.margin }
          value={ this.state.language }
          onChange={ this.handleLanguageChange }>
          <MenuItem value='c' primaryText='C' />
          <MenuItem value='c++' primaryText='C++' />
        </SelectField>
        <FileArea
          fileKey='code'
          textKey='code'
          mode='code'
          onChange={ this.handleCodeChange } />
        <FlatButton label='Submit' primary onTouchTap={ this.handleSubmit } />
      </MessageContainer>
    )
  }

  state = {
    language: 'c'
  };

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    examId: PropTypes.string,
    submitCode: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  };
}

const styles = {
  margin: {
    marginLeft: '5px',
    marginBottom: '5px'
  }
}

export default connect(() => ({}), {submitCode, goBack})(SubmitCode)
