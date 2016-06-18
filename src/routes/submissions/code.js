export default {
  path: 'submissions/:id/code',
  getComponent(_state, cb) {
    require.ensure('views/CodeView/CodeView', () => {
      cb(require('views/CodeView/CodeView'))
    })
  }
}
