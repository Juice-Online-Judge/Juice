import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import computedRoutes from './utils/computedRoutes'
import redirect from './utils/redirect'

export default (store) => {
  return ({
    path: '/',
    component: CoreLayout,
    indexRoute: redirect('/exams'),
    getChildRoutes(_location, next) {
      require.ensure([], (require) => {
        next(null, computedRoutes(store, [
          require('./SignIn'),
          require('./SignUp'),
          require('./Question'),
          require('./Code'),
          require('./Submission'),
          require('./Exam'),
          require('./DashBoard'),
          require('./PermissionDenied'),
          require('./NotFound'),
          redirect('/page-not-found')
        ]))
      })
    }
  })
}
