export default {
  path: ':examId',
  onEnter(state, replace) {
    if (state.routes.length === 3) {
      replace(`/exams/${state.params.examId}/questions`)
    }
  },
  getComponent(_location, next) {
    System.import('./components/ExamDetailView')
      .then((ExamDetailView) => next(null, ExamDetailView))
  },
  getChildRoutes(_location, next) {
    System.import('./routes').then((routes) => next(null, routes))
  }
}
