export default {
  path: ':uuid',
  getComponent(_location, next) {
    require.ensure(['./components/QuestionView'], (require) => {
      next(null, require('./components/QuestionView'))
    })
  }
}
