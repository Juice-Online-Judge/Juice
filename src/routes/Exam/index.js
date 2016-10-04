import BaseLayout from 'layouts/BaseLayout'

export default {
  path: 'exams',
  component: BaseLayout,
  indexRoute: {
    getComponent(_location, next) {
      System.import('./containers/ExamListView')
        .then((ExamListView) => next(null, ExamListView))
    }
  },
  getChildRoutes(_location, next) {
    System.import('./routes').then((routes) => next(null, routes))
  }
}
