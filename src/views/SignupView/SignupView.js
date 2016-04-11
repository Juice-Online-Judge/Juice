import React, { PropTypes } from 'react';
import Radium from 'radium';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import validate from 'validate.js';
import pick from 'lodash/pick';

import { actions as loginActions } from '../../redux/modules/auth';
import { push } from 'react-router-redux';

import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import CenterBlock from 'layouts/CenterBlock';
import rule from 'validation/register';

@Radium
export class SignupView extends React.Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    loginState: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    fetchUserInfo: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired
  };

  constructor(...args) {
    super(...args);
    this.state = {
      username: '',
      nickname: '',
      password: '',
      email: '',
      passwordConfirm: '',
      errorMessage: {
        username: null,
        email: null,
        password: null,
        passwordConfirm: null
      }
    };
  }

  componentDidMount() {
    this.props.fetchUserInfo();
    this.props.clearError();
    this.checkLoginState(this.props);
    this.fetchErrorMessage(this.props);
  }

  componentWillReceiveProps(nextProp) {
    this.checkLoginState(nextProp);
    this.fetchErrorMessage(nextProp);
  }

  @autobind
  fetchErrorMessage(props) {
    let errorMessage = {
      username: null,
      nickname: null,
      email: null,
      password: null,
      passwordConfirm: null
    };
    Object.keys(errorMessage).forEach((key) => {
      errorMessage[key] = props.loginState.getIn(['errorMessage', key], null);
    });
    this.setState({ errorMessage });
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
    validate.async(datas, rule)
      .then(() => {
        this.props.registerUser(datas);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.warn(error);
          throw error;
        } else {
          this.setState({ errorMessage: error });
        }
      });
  }

  render() {
    let { errorMessage } = this.state;
    return (
      <CenterBlock>
        <Paper zDepth={ 3 } style={ Object.assign({}, styles.paper, styles.marginTop) }>
          <Card>
            <CardTitle title='Signup' />
            <CardActions>
              <TextField
                style={ styles.action }
                onChange={ this.setUsername }
                errorText={ errorMessage.username }
                floatingLabelText='Username' />
            </CardActions>
            <CardActions>
              <TextField
                style={ styles.action }
                onChange={ this.setEmail }
                errorText={ errorMessage.email }
                floatingLabelText='Email' />
            </CardActions>
            <CardActions>
              <TextField
                style={ styles.action }
                onChange={ this.setNickname }
                errorText={ errorMessage.nickname }
                floatingLabelText='Nickname' />
            </CardActions>
            <CardActions>
              <TextField
                style={ styles.action }
                type='password'
                onChange={ this.setPassword }
                errorText={ errorMessage.password }
                floatingLabelText='Password' />
            </CardActions>
            <CardActions>
              <TextField
                style={ styles.action }
                type='password'
                onChange={ this.setPasswordConfirm }
                errorText={ errorMessage.passwordConfirm }
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
}

export default connect((state) => {
  return {loginState: state.auth};
}, Object.assign({}, loginActions, { push }))(SignupView);

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
