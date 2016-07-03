import BaseLayout from 'layouts/BaseLayout'

export default {
  path: 'exams',
  component: BaseLayout,
  getIndexRoute(_location, next) {
    require.ensure(['./containers/ExamListView'], () => {
      next(null, {
        component: require('./containers/ExamListView')
      })
    })
  },
  getChildRoutes(_location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/New')
      ])
    })
  }
}
