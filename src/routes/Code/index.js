export default {
  path: '(exams/:examId/)submissions/:id/code',
  getComponent(_state, next) {
    require.ensure('./components/CodeView', () => {
      next(null, require('./components/CodeView'))
    })
  }
}
