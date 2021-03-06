import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {login, oauthLogin} from 'redux/modules/account'

import Paper from 'material-ui/Paper'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
import {Row, Col} from 'react-flexbox-grid'

import CenterBlock from 'layouts/CenterBlock'
import MessageContainer from 'containers/MessageContainer'
import InputAction from 'components/InputAction'
import OAuthButtons from './OAuthButtons'
import styles from 'lib/styles'

const inputs = [
  {
    name: 'username',
    label: 'Username'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password'
  }
]

export class SignInView extends React.Component {
  handleChange = event => {
    const newState = {}
    newState[event.target.name] = event.target.value
    this.setData(newState)
  }

  login = event => {
    const {username, password} = this.data
    event.preventDefault()
    this.props.login(username, password)
  }

  handleKeyDown = event => {
    if (event.keyCode === 13 && event.target.name === 'password') {
      this.login(event)
    }
  }

  setData (newData) {
    this.data = {...this.data, ...newData}
  }

  render () {
    return (
      <CenterBlock>
        <MessageContainer>
          <Paper zDepth={3} style={styles.marginTop20}>
            <Card>
              <CardTitle title='Juice' />
              {inputs.map(({name, label, ...rest}) =>
                <InputAction
                  key={name}
                  name={name}
                  label={label}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  {...rest} />
              )}
              <CardActions>
                <Row>
                  <Col mdOffset={2} md={8} xs={12}>
                    <Row center='xs'>
                      <Col>
                        <FlatButton
                          label='Signin'
                          primary
                          onClick={this.login} />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={2} xs={12}>
                    <OAuthButtons />
                  </Col>
                </Row>
              </CardActions>
            </Card>
          </Paper>
        </MessageContainer>
      </CenterBlock>
    )
  }

  data = {
    username: '',
    password: ''
  }

  static propTypes = {
    login: PropTypes.func.isRequired
  }
}

const isOAuthError = token => token === 'server-error' || token === 'failed'

export default connect(
  () => ({}),
  (dispatch, {location: {query: {oauth}}}) => {
    if (!isOAuthError(oauth)) {
      dispatch(oauthLogin(oauth))
    }

    return bindActionCreators(
      {
        login
      },
      dispatch
    )
  }
)(SignInView)
