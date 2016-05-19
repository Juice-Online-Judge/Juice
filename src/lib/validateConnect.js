import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { compose, setDisplayName, wrapDisplayName, getDisplayName } from 'recompose';
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

      @autobind
      validateForm(fields) {
        return this.props.validateForm(componentName, fields, validateRule)
          .then(() => true).catch(() => false);
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
