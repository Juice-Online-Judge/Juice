import redirectComponent from './redirectComponent';

export const redirectNotAuth = (WrappedComponent) => {
  const shouldRedirectPath = (errorCode) => errorCode === 401 ? '/sign-in' : null;
  return redirectComponent('RedirectNotAuth', shouldRedirectPath, WrappedComponent);
};

export default redirectNotAuth;
