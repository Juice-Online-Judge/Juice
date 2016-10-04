import BaseLayout from 'layouts/BaseLayout'

export default {
  path: 'questions',
  component: BaseLayout,
  indexRoute: {
    getComponent(_location, next) {
      System.import('./components/ExamQuestionDetail')
        .then((ExamQuestionDetail) => next(null, ExamQuestionDetail))
    }
  },
  getChildRoutes(_location, next) {
    System.import('./routes').then((routes) => next(null, routes))
  }
}
