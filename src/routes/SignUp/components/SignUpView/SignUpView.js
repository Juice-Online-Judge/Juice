import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import mapValues from 'lodash/mapValues'
import first from 'lodash/first'
import {Formik} from 'formik'

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
  signup (e) {
    this.props.handleSubmit(e)
  }

  handleVerify = response => {
    this.props.handleChangeValue('g-recaptcha-response', response)
    this.signup(new CustomEvent('submit'))
  }

  handleExpired = () => {
    this.props.handleChangeValue('g-recaptcha-response', undefined)
  }

  handleClick = event => {
    event.preventDefault()
    if (!this.props.values['g-recaptcha-response']) {
      return
    }
    this.signup(event)
  }

  render () {
    const {handleChange} = this.props
    const errors = this.props.errors
    return (
      <CenterBlock>
        <Paper zDepth={3} style={styles.marginTop20}>
          <Card>
            <CardTitle title='SignUp' />
            {inputs.map(({name, label, ...rest}) =>
              <InputAction
                key={name}
                name={name}
                label={label}
                message={errors}
                onChange={handleChange}
                {...rest} />
            )}
            <CardActions>
              <Recaptcha
                onVerify={this.handleVerify}
                onExpired={this.handleExpired}
                sitekey='6LeBKhsUAAAAAFfiapN0MqwR02A1Id-y2wFVuzZ7'>
                <FlatButton label='Signup' primary onClick={this.handleClick} />
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
  }

  static propTypes = {
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChangeValue: PropTypes.func.isRequired
  }
}

export default compose(
  connect(null, {registerUser}),
  Formik({
    validationSchema: rule,
    mapPropsToValues: () => {},
    handleSubmit (payload, {props: {registerUser}, setErrors, setSubmitting}) {
      console.log(payload)
      registerUser(payload).then(() => setSubmitting(false)).catch(err => {
        setSubmitting(false)
        setErrors(mapValues(err.response.data.errors, first))
      })
    }
  })
)(SignUpView)
