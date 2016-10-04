export default {
  path: 'new',
  getComponent(_location, next) {
    System.import('./components/ExamNewView')
      .then((ExamNewView) => next(null, ExamNewView))
  }
}
