import React, { PropTypes } from 'react'
import { bind } from 'decko'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import { login } from 'redux/modules/account'
import redirectOnLogin from 'lib/redirectOnLogin'

import Paper from 'material-ui/Paper'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardActions from 'material-ui/Card/CardActions'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import { Row, Col } from 'react-flexbox-grid'

import CenterBlock from 'layouts/CenterBlock'
import MessageContainer from 'containers/MessageContainer'

export class SignInView extends React.Component {
  @bind
  handleChange(event) {
    const newState = {}
    newState[event.target.name] = event.target.value
    this.setData(newState)
  }

  @bind
  login(event) {
    const { username, password } = this.data
    event.preventDefault()
    this.props.login(username, password)
  }

  @bind
  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.login(event)
    }
  }

  setData(newData) {
    this.data = { ...this.data, ...newData }
  }

  render() {
    return (
      <CenterBlock>
        <MessageContainer>
          <Paper zDepth={ 3 } style={ styles.marginTop }>
            <Card>
              <CardTitle title='Juice' />
              <CardActions>
                <TextField
                  name='username'
                  style={ styles.action }
                  onChange={ this.handleChange }
                  floatingLabelText='Username' />
              </CardActions>
              <CardActions>
                <TextField
                  name='password'
                  style={ styles.action }
                  type='password'
                  onKeyDown={ this.handleKeyDown }
                  onChange={ this.handleChange }
                  floatingLabelText='Password' />
              </CardActions>
              <CardActions>
                <Row>
                  <Col mdOffset={ 2 } md={ 8 } xs={ 12 }>
                    <Row center='xs'>
                      <Col>
                        <FlatButton label='Signin' primary onClick={ this.login } />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={ 2 } xs={ 12 }>
                    <Row end='xs'>
                      <Col>
                        <a href='/api/v1/oauth/facebook'>
                          <IconButton iconClassName='fa fa-facebook-square' />
                        </a>
                        <a href='/api/v1/oauth/github'>
                          <IconButton iconClassName='fa fa-github' />
                        </a>
                      </Col>
                    </Row>
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
  };

  static propTypes = {
    login: PropTypes.func.isRequired
  };
}

export default compose(
  redirectOnLogin,
  connect(null, { login })
)(SignInView)

const styles = {
  action: {
    width: '80%'
  },
  marginTop: {
    marginTop: '20%'
  }
}
