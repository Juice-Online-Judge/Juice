import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createElement from 'recompose/createElement';
import compose from 'recompose/compose';
import omitProps from './omitProps';

import { RequestStatus } from 'lib/const';
import { clearError } from 'redux/modules/app';

export const redirectConnect = connect((state) => ({ app: state.app }),
  { replace, clearError });

export const redirectComponent = (name, shouldRedirectPath, WrappedComponent) => {
  const redirectComponentHoc = (WrappedComponent) => {
    return class extends Component {
      componentWillMount() {
        this.checkRedirect(this.props);
      }

      componentWillReceiveProps(nextProps) {
        this.checkRedirect(nextProps);
      }

      checkRedirect(props) {
        const { app, clearError, replace } = props;
        if (app.get('status') === RequestStatus.FAIL) {
          const errorCode = app.getIn(['error', 'code']);
          const redirectPath = shouldRedirectPath(errorCode);
          clearError();
          if (redirectPath) {
            replace(redirectPath);
          }
        }
      }

      render() {
        return createElement(WrappedComponent, this.props);
      }

      static propTypes = {
        app: PropTypes.object.isRequired,
        clearError: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
      };
    };
  };

  return compose(
    redirectConnect,
    setDisplayName(wrapDisplayName(WrappedComponent, name)),
    redirectComponentHoc,
    omitProps([
      'app',
      'clearError'
    ])
  )(WrappedComponent);
};

export default redirectComponent;
