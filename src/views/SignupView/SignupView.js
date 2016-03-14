import React, { PropTypes } from 'react';
import Radium from 'radium';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import validate from 'validate.js';
import pick from 'lodash/pick';

import { actions as loginActions } from '../../redux/modules/auth';
import { routeActions } from 'react-router-redux';

import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import rule from 'validation/register';

let { push } = routeActions;

@Radium
export class SignupView extends React.Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    loginState: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    fetchUserInfo: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRquired
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
      <div style={ styles.container }>
        <div style={ [styles.margin, styles.flexContainer] }>
          <Paper zDepth={ 3 } style={ styles.paper }>
            <Card>
              <CardTitle style={ styles.flexContainer } title='Signup' />
              <CardActions style={ styles.flexContainer }>
                <TextField style={ styles.action }
                  onChange={ this.setUsername }
                  errorText={ errorMessage.username }
                  floatingLabelText='Username' />
              </CardActions>
              <CardActions style={ styles.flexContainer }>
                <TextField style={ styles.action }
                  onChange={ this.setEmail }
                  errorText={ errorMessage.email }
                  floatingLabelText='Email' />
              </CardActions>
              <CardActions style={ styles.flexContainer }>
                <TextField style={ styles.action }
                  onChange={ this.setNickname }
                  errorText={ errorMessage.nickname }
                  floatingLabelText='Nickname' />
              </CardActions>
              <CardActions style={ styles.flexContainer }>
                <TextField style={ styles.action }
                  type='password'
                  onChange={ this.setPassword }
                  errorText={ errorMessage.password }
                  floatingLabelText='Password' />
              </CardActions>
              <CardActions style={ styles.flexContainer }>
                <TextField style={ styles.action }
                  type='password'
                  onChange={ this.setPasswordConfirm }
                  errorText={ errorMessage.passwordConfirm }
                  floatingLabelText='PasswordConfirm' />
              </CardActions>
              <CardActions style={ styles.flexContainer }>
                <FlatButton label='Signup' primary onClick={ this.signup } />
              </CardActions>
            </Card>
          </Paper>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {loginState: state.auth};
}, Object.assign({}, loginActions, { push }))(SignupView);

let styles = {
  container: {
    height: '100%',
    width: '100%'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  margin: {
    marginTop: '20px'
  },
  paper: {
    width: '40%',
    height: '40%'
  },
  action: {
    width: '80%'
  }
};
