import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import {
  mapProps,
  lifecycle,
  setDisplayName,
  wrapDisplayName,
  doOnReceiveProps,
  compose
 } from 'recompose';
import omit from 'lodash/fp/omit';

import { RequestStatus } from 'lib/const';
import { actions as appActions } from 'redux/modules/app';

const omitProps = compose(mapProps, omit);

export const redirectConnect = (UnconnectRedirectComponent) => {
  return connect((state) => ({ app: state.app }),
    Object.assign({}, appActions, { replace }))(UnconnectRedirectComponent);
};

export const redirectComponent = (name, shouldRedirectPath, WrappedComponent) => {
  return compose(
    redirectConnect,
    setDisplayName(wrapDisplayName(WrappedComponent, name)),
    lifecycle((component) => component.props.clearError()),
    doOnReceiveProps((props) => {
      if (props.app.get('status') === RequestStatus.FAIL) {
        const errorCode = props.app.getIn(['error', 'code']);
        const redirectPath = shouldRedirectPath(errorCode);
        props.clearError();
        if (redirectPath) {
          this.props.replace(redirectPath);
        }
      }
    }),
    omitProps([
      'app',
      'setStatus',
      'clearStatus',
      'setError',
      'clearError'
    ])
  )(WrappedComponent);
};

export default redirectComponent;
