export default {
  path: 'submissions',
  getComponent(_location, next) {
    System.import('./components/ExamSubmissionDetail')
      .then((ExamSubmissionDetail) => next(null, ExamSubmissionDetail))
  }
}
