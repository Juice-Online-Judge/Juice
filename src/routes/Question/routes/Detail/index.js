export default {
  path: ':uuid',
  getComponent(_location, next) {
    require.ensure(['routes/components/QuestionView'], (require) => {
      next(null, require('routes/components/QuestionView'))
    })
  }
}
