import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import getDisplayName from 'react-display-name';

import { RequestStatus } from 'lib/const';
import { actions as appActions } from 'redux/modules/app';

export const redirectNotFound = (WrappedComponent) => {
  const componentName = getDisplayName(WrappedComponent);

  class RedirectNotFound extends Component {
    componentWillReceiveProps(newProps) {
      if (newProps.app.get('status') === RequestStatus.FAIL &&
          newProps.app.getIn(['error', 'code']) === 404) {
        this.props.clearError();
        this.props.replace('/page-not-found');
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

  RedirectNotFound.displayName = `RedirectNotFound(${componentName})`;

  return connect((state) => ({ app: state.app }),
    Object.assign({}, appActions, { replace }))(RedirectNotFound);
};

export default redirectNotFound;
