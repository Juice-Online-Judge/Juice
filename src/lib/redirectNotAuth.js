import redirectComponent from './redirectComponent';

const shouldRedirectPath = (errorCode) => errorCode === 401 ? '/sign-in' : null;

export const redirectNotAuth = (WrappedComponent) => redirectComponent(
  'RedirectNotAuth',
  shouldRedirectPath,
  WrappedComponent
);

export default redirectNotAuth;
