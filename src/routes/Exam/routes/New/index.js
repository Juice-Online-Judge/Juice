export default {
  path: 'new',
  getComponent(_location, next) {
    require.ensure([
      'material-ui/RaisedButton',
      'material-ui/Stepper/Step',
      'material-ui/Stepper/Stepper',
      'material-ui/Stepper/StepLabel',
      'lib/redirectNotAdmin'
    ], () => {
      require.ensure(['./components/ExamNewView'], () => {
        next(null, require('./components/ExamNewView'))
      })
    })
  }
}
