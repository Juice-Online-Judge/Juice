import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import redirect from './utils/redirect'

export default {
  path: '/',
  component: CoreLayout,
  indexRoute: redirect('/exams'),
  getChildRoutes(_location, next) {
    System.import('./routes')
      .then((routes) => next(null, routes))
  }
}
