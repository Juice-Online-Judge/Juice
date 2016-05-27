import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';
import pick from 'lodash/pick';
import compose from 'recompose/compose';

import { registerUser } from '../../redux/modules/account';

import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { Row, Col } from 'react-flexbox-grid';

import CenterBlock from 'layouts/CenterBlock';
import rule from 'validation/register';
import redirectOnLogin from 'lib/redirectOnLogin';
import validateForm from 'lib/validateForm';

export class SignUpView extends React.Component {
  @bind
  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setData(newState);
  }

  @bind
  signup(event) {
    let fields = [
      'username',
      'nickname',
      'password',
      'email',
      'passwordConfirm'
    ];
    let datas = pick(this.data, fields);
    event.preventDefault();
    this.props.validateForm(datas)
    .then((result) => {
      if (result) {
        this.props.registerUser(datas);
      }
    });
  }

  setData(newData) {
    this.data = { ...this.data, ...newData };
  }

  render() {
    const message = this.props.validation;
    return (
      <CenterBlock>
        <Paper zDepth={ 3 } style={ styles.marginTop }>
          <Card>
            <CardTitle title='SignUp' />
            <CardActions>
              <TextField
                name='username'
                style={ styles.action }
                onChange={ this.handleChange }
                errorText={ message.get('username') }
                floatingLabelText='Username' />
            </CardActions>
            <CardActions>
              <TextField
                name='email'
                style={ styles.action }
                onChange={ this.handleChange }
                errorText={ message.get('email') }
                floatingLabelText='Email' />
            </CardActions>
            <CardActions>
              <TextField
                name='nickname'
                style={ styles.action }
                onChange={ this.handleChange }
                errorText={ message.get('nickname') }
                floatingLabelText='Nickname' />
            </CardActions>
            <CardActions>
              <TextField
                name='password'
                style={ styles.action }
                type='password'
                onChange={ this.handleChange }
                errorText={ message.get('password') }
                floatingLabelText='Password' />
            </CardActions>
            <CardActions>
              <TextField
                name='passwordConfirm'
                style={ styles.action }
                type='password'
                onChange={ this.handleChange }
                errorText={ message.get('passwordConfirm') }
                floatingLabelText='PasswordConfirm' />
            </CardActions>
            <CardActions>
              <Row>
                <Col mdOffset={ 2 } md={ 8 } xs={ 12 }>
                  <Row center='xs'>
                    <Col>
                      <FlatButton label='Signup' primary onClick={ this.signup } />
                    </Col>
                  </Row>
                </Col>
                <Col md={ 2 } xs={ 12 }>
                  <Row end='xs'>
                    <Col>
                      <IconButton iconClassName='fa fa-facebook-square' />
                      <IconButton iconClassName='fa fa-github' />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardActions>
          </Card>
        </Paper>
      </CenterBlock>
    );
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
    registerUser: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired
  };
}

export default compose(
  redirectOnLogin,
  connect(
    (state) => ({ loginState: state.account }),
    { registerUser }
  ),
  validateForm(rule)
)(SignUpView);

let styles = {
  action: {
    width: '80%'
  },
  marginTop: {
    marginTop: '20px'
  }
};
