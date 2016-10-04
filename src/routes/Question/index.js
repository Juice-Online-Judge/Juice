import BaseLayout from 'layouts/BaseLayout'

export default {
  path: 'questions',
  component: BaseLayout,
  indexRoute: {
    getComponent(_location, next) {
      System.import('./components/QuestionListView')
        .then((QuestionListView) => next(null, QuestionListView))
    }
  },
  getChildRoutes(_location, next) {
    System.import('./routes').then((routes) => next(null, routes))
  }
}
