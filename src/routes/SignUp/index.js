export default {
  path: 'sign-up',
  getComponent(_location, next) {
    System.import('./components/SignUpView')
      .then((SignUpView) => next(null, SignUpView))
  }
}
