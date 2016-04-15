import React, { PropTypes } from 'react';
import Radium from 'radium';
import { autobind } from 'core-decorators';
import pick from 'lodash/pick';

import { actions as accountActions } from '../../redux/modules/account';
import { push } from 'react-router-redux';

import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import CenterBlock from 'layouts/CenterBlock';
import rule from 'validation/register';
import validateConnect from 'lib/validateConnect';
import { silencePromise } from 'lib/utils';

@Radium
export class SignupView extends React.Component {
  componentDidMount() {
    this.props.fetchUserInfo();
    this.checkLoginState(this.props);
  }

  componentWillReceiveProps(nextProp) {
    this.checkLoginState(nextProp);
  }

  checkLoginState(props) {
    if (props.loginState.get('state')) {
      props.push('/');
    }
  }

  @autobind
  setUsername(event) {
    this.setState({username: event.target.value});
  }

  @autobind
  setNickname(event) {
    this.setState({nickname: event.target.value});
  }

  @autobind
  setPassword(event) {
    this.setState({password: event.target.value});
  }

  @autobind
  setPasswordConfirm(event) {
    this.setState({passwordConfirm: event.target.value});
  }

  @autobind
  setEmail(event) {
    this.setState({email: event.target.value});
  }

  @autobind
  signup(event) {
    let fields = [
      'username',
      'nickname',
      'password',
      'email',
      'passwordConfirm'
    ];
    let datas = pick(this.state, fields);
    event.preventDefault();
    silencePromise(this.props.validateForm(datas)
    .then(() => {
      this.props.registerUser(datas);
    }));
  }

  render() {
    const message = this.props.validation;
    return (
      <CenterBlock>
        <Paper zDepth={ 3 } style={ Object.assign({}, styles.paper, styles.marginTop) }>
          <Card>
            <CardTitle title='Signup' />
            <CardActions>
              <TextField
                style={ styles.action }
                onChange={ this.setUsername }
                errorText={ message.get('username') }
                floatingLabelText='Username' />
            </CardActions>
            <CardActions>
              <TextField
                style={ styles.action }
                onChange={ this.setEmail }
                errorText={ message.get('email') }
                floatingLabelText='Email' />
            </CardActions>
            <CardActions>
              <TextField
                style={ styles.action }
                onChange={ this.setNickname }
                errorText={ message.get('nickname') }
                floatingLabelText='Nickname' />
            </CardActions>
            <CardActions>
              <TextField
                style={ styles.action }
                type='password'
                onChange={ this.setPassword }
                errorText={ message.get('password') }
                floatingLabelText='Password' />
            </CardActions>
            <CardActions>
              <TextField
                style={ styles.action }
                type='password'
                onChange={ this.setPasswordConfirm }
                errorText={ message.get('passwordConfirm') }
                floatingLabelText='PasswordConfirm' />
            </CardActions>
            <CardActions>
              <FlatButton label='Signup' primary onClick={ this.signup } />
            </CardActions>
          </Card>
        </Paper>
      </CenterBlock>
    );
  }

  state = {
    username: '',
    nickname: '',
    password: '',
    email: '',
    passwordConfirm: ''
  };

  static propTypes = {
    push: PropTypes.func.isRequired,
    loginState: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    validation: PropTypes.object.isRequired,
    fetchUserInfo: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired
  };
}

export default validateConnect(rule, (state) => {
  return {loginState: state.account};
}, Object.assign({}, accountActions, { push }))(SignupView);

let styles = {
  paper: {
    width: '100%',
    height: '100%'
  },
  action: {
    width: '80%'
  },
  marginTop: {
    marginTop: '20px'
  }
};
