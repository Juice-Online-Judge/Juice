export default {
  path: ':uuid',
  getComponent(_location, next) {
    require.ensure([], (require) => {
      next(null, require('routes/components/QuestionView'))
    })
  }
}
