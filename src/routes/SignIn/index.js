export default {
  path: 'sign-in',
  getComponent(_location, next) {
    System.import('./components/SignInView')
      .then((SignInView) => next(null, SignInView))
  }
}
