import React, { Component, PropTypes } from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import getDisplayName from 'recompose/getDisplayName';
import compose from 'recompose/compose';
import { createGetComponentMessage, validateForm, clearValidationMessage } from 'redux/modules/validate';

const validateConnect = (validateRule) => {
  return (WrappedComponent) => {
    const componentName = getDisplayName(WrappedComponent);
    const getComponentMessage = createGetComponentMessage(componentName);
    const mapStates = (state) => getComponentMessage(state);

    class ValidateCommponent extends Component {
      componentWillMount() {
        this.props.clearValidationMessage(componentName);
      }

      @bind
      validateForm(fields, cb) {
        return this.props.validateForm(componentName, fields, validateRule, cb);
      }

      render() {
        const props = { ...this.props, validateForm: this.validateForm };
        return (
          <WrappedComponent { ...props } />
        );
      }

      static propTypes = {
        validateForm: PropTypes.func.isRequired,
        clearValidationMessage: PropTypes.func.isRequired
      }
    }

    return compose(
      connect(mapStates, { validateForm, clearValidationMessage }),
      setDisplayName(wrapDisplayName(WrappedComponent, 'Validate'))
    )(ValidateCommponent);
  };
};

export default validateConnect;
