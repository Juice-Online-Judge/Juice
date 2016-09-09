import BaseLayout from 'layouts/BaseLayout'

export default {
  path: 'questions',
  component: BaseLayout,
  getIndexRoute(_location, next) {
    require.ensure('./components/QuestionListView', (require) => {
      next(null, {
        component: require('./components/QuestionListView')
      })
    })
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
