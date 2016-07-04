import BaseLayout from 'layouts/BaseLayout'
import { injectReducer } from 'redux/reducers'

export default (store) => {
  return ({
    path: 'exams',
    component: BaseLayout,
    getIndexRoute(_location, next) {
      require.ensure([
        './containers/ExamListView',
        './modules/exam'
      ], () => {
        injectReducer(store, {
          key: 'exam',
          reducer: require('./modules/exam').reducer
        })

        next(null, {
          component: require('./containers/ExamListView')
        })
      })
    },
    getChildRoutes(_location, next) {
      require.ensure([], (require) => {
        injectReducer(store, {
          key: 'exam',
          reducer: require('./modules/exam').reducer
        })

        next(null, [
          require('./routes/New'),
          require('./routes/Detail')
        ])
      })
    }
  })
}
