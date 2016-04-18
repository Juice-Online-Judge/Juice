import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import getDisplayName from 'react-display-name';

import { RequestStatus } from 'lib/const';
import { actions as appActions } from 'redux/modules/app';

export const redirectConnect = (UnconnectRedirectComponent) => {
  return connect((state) => ({ app: state.app }),
    Object.assign({}, appActions, { replace }))(UnconnectRedirectComponent);
};

export const redirectComponent = (name, shouldRedirectPath, WrappedComponent) => {
  const componentName = getDisplayName(WrappedComponent);

  class RedirectComponent extends Component {
    componentWillMount() {
      this.props.clearError();
    }

    componentWillReceiveProps(newProps) {
      if (newProps.app.get('status') === RequestStatus.FAIL) {
        const errorCode = newProps.app.getIn(['error', 'code']);
        const redirectPath = shouldRedirectPath(errorCode);
        this.props.clearError();
        if (redirectPath) {
          this.props.replace(redirectPath);
        }
      }
    }

    render() {
      const props = this.props;
      return (
        <WrappedComponent { ...props } />
      );
    }

    static propTypes = {
      app: PropTypes.object.isRequired,
      clearError: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    };
  }

  RedirectComponent.displayName = `${name}(${componentName})`;

  return redirectConnect(RedirectComponent);
};

export default redirectComponent;
