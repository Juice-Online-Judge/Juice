import React from 'react';
import getDisplayName from 'react-display-name';
import { RedirectComponent, redirectConnect } from './redirectComponent';

export const redirectNotFound = (WrappedComponent) => {
  const componentName = getDisplayName(WrappedComponent);

  class RedirectNotFound extends RedirectComponent {
    constructor(...args) {
      super({ errorCode: 404, distPath: '/page-not-found' }, ...args);
    }

    render() {
      const props = this.props;

      return (
        <WrappedComponent { ...props } />
      );
    }
  }

  RedirectNotFound.displayName = `RedirectNotFound(${componentName})`;

  return redirectConnect(RedirectNotFound);
};

export default redirectNotFound;
