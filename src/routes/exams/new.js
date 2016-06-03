export default {
  path: 'exams/new',
  getComponent(_state, cb) {
    require.ensure([
      'material-ui/RaisedButton',
      'material-ui/Stepper/Step',
      'material-ui/Stepper/Stepper',
      'material-ui/Stepper/StepLabel',
      'lib/redirectNotAdmin'
    ], () => {
      require.ensure('views/ExamNewView/ExamNewView', () => {
        cb(null, require('views/ExamNewView/ExamNewView').default);
      });
    });
  }
};
