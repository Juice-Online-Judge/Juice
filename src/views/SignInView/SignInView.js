import React, { PropTypes } from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { login } from 'redux/modules/account';
import { createErrorSelector } from 'redux/modules/app';
import redirectOnLogin from 'lib/redirectOnLogin';

import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import CenterBlock from 'layouts/CenterBlock';

export class SignInView extends React.Component {
  @bind
  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setData(newState);
  }

  @bind
  handleRequestClose() {
    this.setState({ open: false });
  }

  @bind
  login(event) {
    let { username, password } = this.data;
    event.preventDefault();
    this.props.login(username, password)
      .then((result) => {
        if (!result) {
          this.setState({ open: true });
        }
      });
  }

  @bind
  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.login(event);
    }
  }

  setData(newData) {
    this.data = { ...this.data, ...newData };
  }

  render() {
    const { errorMessages } = this.props;
    const message = errorMessages ? errorMessages.get(0) : '';
    return (
      <CenterBlock>
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
    open: false
  };

  data = {
    username: '',
    password: ''
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    errorMessages: PropTypes.object
  };
}

const errorSelector = createErrorSelector();

export default compose(
  redirectOnLogin,
  connect((state) => ({ errorMessages: errorSelector(state) }), { login })
)(SignInView);

let styles = {
  action: {
    width: '80%'
  },
  marginTop: {
    marginTop: '20%'
  }
};
