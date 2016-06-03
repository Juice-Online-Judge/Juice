export default {
  path: 'exams/new',
  getComponent(cb) {
    require.ensure('views/ExamNewView/ExamNewView', () => {
      cb(null, require('views/ExamNewView/ExamNewView').default);
    });
  }
};
