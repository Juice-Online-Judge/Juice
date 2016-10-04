export default {
  path: '(exams/:examId/)submissions/:id/code',
  getComponent(_state, next) {
    System.import('./containers/CodeView')
      .then((CodeView) => next(null, CodeView))
  }
}
