export default {
  path: 'submissions',
  getComponent(_location, next) {
    require.ensure(['./components/ExamSubmissionDetail'], (require) => {
      next(null, require('./components/ExamSubmissionDetail'))
    })
  }
}
