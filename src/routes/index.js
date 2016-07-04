import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import redirect from './utils/redirect'

export default {
  path: '/',
  component: CoreLayout,
  indexRoute: redirect('/exams'),
  getChildRoutes(_location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./sign-in'),
        require('./sign-up'),
        require('./Question'),
        require('./Code'),
        require('./submissions'),
        require('./Exam'),
        require('./dashboard'),
        require('./PermissionDenied'),
        require('./NotFound'),
        redirect('/page-not-found')
      ])
    })
  }
}
