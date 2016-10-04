export default {
  path: 'submissions',
  getComponent(_location, next) {
    System.import('./components/SubmissionView')
      .then((SubmissionView) => next(null, SubmissionView))
  }
}
