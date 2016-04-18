import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import invariant from 'invariant';
import { replace } from 'react-router-redux';

import { RequestStatus } from 'lib/const';
import { actions as appActions } from 'redux/modules/app';

export class RedirectComponent extends Component {
  constructor(opts, ...args) {
    const { errorCode, distPath } = opts;
    super(...args);
    invariant(errorCode && distPath,
      'This is an abstract class, please define error code and redirect path');
    this.errorCode = errorCode;
    this.distPath = distPath;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.app.get('status') === RequestStatus.FAIL &&
        newProps.app.getIn(['error', 'code']) === this.errorCode) {
      this.props.clearError();
      this.props.replace(this.distPath);
    }
  }

  render() {
    invariant(false, 'Please override render method');
  }

  static propTypes = {
    app: PropTypes.object.isRequired,
    clearError: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  };
}

export const redirectConnect = (UnconnectRedirectComponent) => {
  return connect((state) => ({ app: state.app }),
    Object.assign({}, appActions, { replace }))(UnconnectRedirectComponent);
};

export default {
  RedirectComponent,
  redirectConnect
};
