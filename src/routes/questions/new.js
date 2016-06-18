export default {
  path: 'questions/new',
  getComponent(_state, cb) {
    require.ensure([
      'material-ui/RaisedButton',
      'material-ui/Stepper/Step',
      'material-ui/Stepper/Stepper',
      'material-ui/Stepper/StepLabel',
      'lib/redirectNotAdmin'
    ], () => {
      require.ensure('views/QuestionNewView/QuestionNewView', () => {
        cb(null, require('views/QuestionNewView/QuestionNewView'))
      })
    })
  }
}
