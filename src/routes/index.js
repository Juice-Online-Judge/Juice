import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import signIn from './sign-in'
import signUp from './sign-up'
import questions from './questions'
import questionNew from './questions/new'
import questionDetail from './questions/detail'
import submissions from './submissions'
import submissionCode from './submissions/code'
import exams from './exams'
import examNew from './exams/new'
import examDetail from './exams/detail'
import dashboard from './dashboard'
import examQuestionDetail from './exams/question-detail.js'
import examSubmissionCode from './exams/code.js'
import permissionDenied from './permission-denied'
import pageNotFound from './page-not-found'
import redirect from './utils/redirect'

export default {
  path: '/',
  component: CoreLayout,
  indexRoute: redirect('/exams'),
  childRoutes: [
    signIn,
    signUp,
    dashboard,
    questions,
    questionNew,
    questionDetail,
    submissions,
    submissionCode,
    exams,
    redirect('exams/:id', 'exams/:id/questions'),
    examNew,
    examDetail,
    examQuestionDetail,
    examSubmissionCode,
    permissionDenied,
    pageNotFound,
    redirect('/page-not-found')
  ]
}
