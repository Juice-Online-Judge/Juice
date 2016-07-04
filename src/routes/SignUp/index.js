export default {
  path: 'sign-up',
  getComponent(_location, next) {
    require.ensure(['./components/SignUpView'], (require) => {
      next(null, require('./components/SignUpView'))
    })
  }
}
