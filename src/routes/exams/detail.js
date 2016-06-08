import ExamDetailView from 'views/ExamDetailView/ExamDetailView'
import questions from './questions'
import submissions from './submissions'

export default {
  path: 'exams/:id',
  component: ExamDetailView,
  childRoutes: [
    questions,
    submissions
  ]
}
