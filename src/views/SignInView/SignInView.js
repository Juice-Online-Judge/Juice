import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';

import { fetchUserInfo, login } from 'redux/modules/account';
import { clearError, createIsErrorSelector, createErrorSelector } from 'redux/modules/app';
import { push } from 'react-router-redux';

import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import CenterBlock from 'layouts/CenterBlock';

export class SignInView extends React.Component {
  componentDidMount() {
    this.props.clearError();
    this.checkLoginState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.error });
    this.checkLoginState(nextProps);
  }

  checkLoginState(props) {
    if (props.account.get('state')) {
      props.push('/');
    }
  }

  @autobind
  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  @autobind
  handleRequestClose() {
    this.setState({ open: false });
  }

  @autobind
  login(event) {
    let { username, password } = this.state;
    event.preventDefault();
    this.props.login(username, password);
  }

  @autobind
  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.login(event);
    }
  }

  render() {
    const { errorMessages } = this.props;
    const message = errorMessages ? errorMessages.get(0) : '';
    return (
      <CenterBlock>
        <Paper zDepth={ 3 } style={ { ...styles.paper, ...styles.marginTop } }>
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
              <FlatButton label='Signin' primary onClick={ this.login } />
            </CardActions>
          </Card>
        </Paper>
        <Snackbar
          message={ message }
          open={ this.state.open }
          autoHideDuration={ 2000 }
          onRequestClose={ this.handleRequestClose } />
      </CenterBlock>
    );
  }

  state = {
    open: false,
    username: '',
    password: ''
  };

  static propTypes = {
    push: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    errorMessages: PropTypes.object,
    clearError: PropTypes.func.isRequired,
    fetchUserInfo: PropTypes.func.isRequired
  };
}

const isErrorSelector = createIsErrorSelector();
const errorSelector = createErrorSelector();

export default connect((state) => ({
  account: state.account,
  error: isErrorSelector(state),
  errorMessages: errorSelector(state)
}), { fetchUserInfo, login, clearError, push })(SignInView);

let styles = {
  paper: {
    width: '100%',
    height: '100%'
  },
  action: {
    width: '80%'
  },
  marginTop: {
    marginTop: '20%'
  }
};
