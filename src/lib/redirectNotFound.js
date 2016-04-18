import redirectComponent from './redirectComponent';

export const redirectNotFound = (WrappedComponent) => {
  const shouldRedirectPath = (errorCode) => errorCode === 404 ? '/page-not-found' : null;
  return redirectComponent('RedirectNotFound', shouldRedirectPath, WrappedComponent);
};

export default redirectNotFound;
