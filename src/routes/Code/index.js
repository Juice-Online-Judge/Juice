export default {
  path: '(exams/:examId/)submissions/:id/code',
  getComponent(_state, next) {
    require.ensure('./containers/CodeView', () => {
      next(null, require('./containers/CodeView'))
    })
  }
}
