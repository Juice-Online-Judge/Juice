export default {
  path: 'submissions',
  getComponent(_location, next) {
    require.ensure(['./components/SubmissionView'], (require) => {
      next(null, require('./components/SubmissionView'))
    })
  }
}
