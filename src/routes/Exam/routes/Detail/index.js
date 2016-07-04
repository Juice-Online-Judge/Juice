export default {
  path: ':id',
  onEnter(state, replace) {
    if (state.routes.length === 3) {
      replace(`/exams/${state.params.id}/questions`)
    }
  },
  getComponent(_location, next) {
    require.ensure(['./components/ExamDetailView'], (require) => {
      next(null, require('./components/ExamDetailView'))
    })
  },
  getChildRoutes(_location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Questions'),
        require('./routes/Submissions')
      ])
    })
  }
}
