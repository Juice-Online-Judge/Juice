import BaseLayout from 'layouts/BaseLayout'

export default {
  path: 'questions',
  component: BaseLayout,
  indexRoute: {
    getComponent(_location, next) {
      require.ensure(['./components/ExamQuestionDetail'], (require) => {
        next(null, require('./components/ExamQuestionDetail'))
      })
    }
  },
  getChildRoutes(_location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Detail')
      ])
    })
  }
}
