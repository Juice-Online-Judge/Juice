export default {
  path: 'exams/:examId/submissions/:id/code',
  getComponent(_state, cb) {
    require.ensure('views/CodeView/CodeView', () => {
      cb(null, require('views/CodeView/CodeView').default)
    })
  }
}
