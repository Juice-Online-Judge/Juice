import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import getDisplayName from 'react-display-name';

import { createGetComponentMessage, actions as validateActions } from 'redux/modules/validate';

const validateConnect = (validateRule, mapStatesToProps, actions) => {
  return (WrappedComponent) => {
    const name = getDisplayName(WrappedComponent);
    const getComponentMessage = createGetComponentMessage(name);
    const mapStates = (state) => Object.assign({}, mapStatesToProps(state), getComponentMessage(state));

    class ValidateCommponent extends Component {
      componentWillMount() {
        this.props.clearValidationMessage(name);
      }

      @autobind
      validateForm(fields) {
        return this.props.validateForm(name, fields, validateRule);
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

    return connect(mapStates, { ...actions, ...validateActions })(ValidateCommponent);
  };
};

export default validateConnect;
