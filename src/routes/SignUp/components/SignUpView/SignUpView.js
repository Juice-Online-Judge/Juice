import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bind} from 'decko'
import compose from 'recompose/compose'
import Radium from 'radium'

import {registerUser} from 'redux/modules/account'

import Paper from 'material-ui/Paper'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'

import CenterBlock from 'layouts/CenterBlock'
import Recaptcha from 'components/Recaptcha'
import InputAction from 'components/InputAction'
import rule from 'validation/register'
import redirectOnLogin from 'lib/redirectOnLogin'
import validateForm from 'lib/validateForm'
import styles from 'lib/styles'

const inputs = [
  {
    name: 'username',
    label: 'Username'
  },
  {
    name: 'email',
    label: 'Email'
  },
  {
    name: 'nickname',
    label: 'Nickname'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password'
  },
  {
    name: 'passwordConfirm',
    label: 'PasswordConfirm',
    type: 'password'
  }
]

export class SignUpView extends React.Component {
  @bind handleChange(event) {
    const newState = {}
    newState[event.target.name] = event.target.value
    this.setData(newState)
  }

  @bind signup() {
    this.props.registerUser(this.data)
  }

  @bind handleVerify(response) {
    this.setData({'g-recaptcha-response': response})
    this.signup()
  }

  setData(newData) {
    this.data = {...this.data, ...newData}
  }

  render() {
    const message = this.props.validation
    return (
      <CenterBlock>
        <Paper zDepth={ 3 } style={ styles.marginTop20 }>
          <Card>
            <CardTitle title='SignUp' />
            {inputs.map(({name, label, ...rest}) => (
              <InputAction
                key={ name }
                name={ name }
                label={ label }
                message={ message }
                onChange={ this.handleChange }
                { ...rest } />
            ))}
            <CardActions>
              <Recaptcha
                onVerify={ this.handleVerify }
                sitekey='6LeBKhsUAAAAAFfiapN0MqwR02A1Id-y2wFVuzZ7'>
                <FlatButton label='Signup' primary />
              </Recaptcha>
            </CardActions>
          </Card>
        </Paper>
      </CenterBlock>
    )
  }

  data = {
    username: '',
    nickname: '',
    password: '',
    email: '',
    passwordConfirm: ''
  };

  static propTypes = {
    validation: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired
  };
}

export default compose(
  redirectOnLogin,
  connect(state => ({loginState: state.account}), {registerUser}),
  validateForm(rule),
  Radium
)(SignUpView)
