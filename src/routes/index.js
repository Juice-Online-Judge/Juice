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
        require('./questions'),
        require('./questions/new'),
        require('./questions/detail'),
        require('./Code'),
        require('./submissions'),
        require('./Exam'),
        redirect('exams/:id', 'exams/:id/questions'),
        require('./exams/detail'),
        require('./dashboard'),
        require('./exams/question-detail.js'),
        require('./PermissionDenied'),
        require('./NotFound'),
        redirect('/page-not-found')
      ])
    })
  }
}
