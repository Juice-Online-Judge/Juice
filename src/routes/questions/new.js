export default {
  path: 'questions/new',
  getComponent(cb) {
    require.ensure('views/QuestionNewView/QuestionNewView', () => {
      cb(null, require('views/QuestionNewView/QuestionNewView').default);
    });
  }
};
