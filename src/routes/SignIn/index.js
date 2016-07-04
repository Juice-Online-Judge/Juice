export default {
  path: 'sign-in',
  getComponent(_location, next) {
    require.ensure(['./components/SignInView'], (require) => {
      next(null, require('./components/SignInView'))
    })
  }
}
