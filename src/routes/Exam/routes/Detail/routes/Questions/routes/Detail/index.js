export default {
  path: ':uuid',
  getComponent(_location, next) {
    System.import('routes/components/QuestionView')
    .then((QuestionView) => next(null, QuestionView))
  }
}
