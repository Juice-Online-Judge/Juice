import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import doOnReceiveProps from 'recompose/doOnReceiveProps';
import compose from 'recompose/compose';
import omitProps from './omitProps';

import { RequestStatus } from 'lib/const';
import { actions as appActions } from 'redux/modules/app';

export const redirectConnect = connect((state) => ({ app: state.app }),
  Object.assign({}, appActions, { replace }));

export const redirectComponent = (name, shouldRedirectPath, WrappedComponent) => {
  return compose(
    redirectConnect,
    setDisplayName(wrapDisplayName(WrappedComponent, name)),
    doOnReceiveProps((props) => {
      props.clearError();
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
