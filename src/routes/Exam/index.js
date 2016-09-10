import BaseLayout from 'layouts/BaseLayout'

export default {
  path: 'exams',
  component: BaseLayout,
  indexRoute: {
    getComponent(_location, next) {
      require.ensure(['./containers/ExamListView'], () => {
        next(null, require('./containers/ExamListView'))
      })
    }
  },
  getChildRoutes(_location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/New'),
        require('./routes/Detail')
      ])
    })
  }
}
