import redirectComponent from './redirectComponent';

const shouldRedirectPath = (errorCode) => errorCode === 404 ? '/page-not-found' : null;

export const redirectNotFound = (WrappedComponent) => redirectComponent(
  'RedirectNotFound',
  shouldRedirectPath,
  WrappedComponent
);

export default redirectNotFound;
