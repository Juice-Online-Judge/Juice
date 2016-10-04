export default {
  path: 'new',
  getComponent(_location, next) {
    System.import('./components/QuestionNewView')
      .then((QuestionNewView) => next(null, QuestionNewView))
  }
}
