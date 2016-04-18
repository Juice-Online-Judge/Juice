import React from 'react';
import getDisplayName from 'react-display-name';
import { RedirectComponent, redirectConnect } from './redirectComponent';

export const redirectNotAuth = (WrappedComponent) => {
  const componentName = getDisplayName(WrappedComponent);

  class RedirectNotAuth extends RedirectComponent {
    constructor(...args) {
      super({ errorCode: 401, distPath: '/sign-in' }, ...args);
    }

    render() {
      const props = this.props;

      return (
        <WrappedComponent { ...props } />
      );
    }
  }

  RedirectNotAuth.displayName = `RedirectNotAuth(${componentName})`;

  return redirectConnect(RedirectNotAuth);
};

export default redirectNotAuth;
