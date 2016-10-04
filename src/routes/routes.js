import SignIn from './SignIn'
import SignUp from './SignUp'
import Question from './Question'
import Code from './Code'
import Submission from './Submission'
import Exam from './Exam'
import DashBoard from './DashBoard'
import PermissionDenied from './PermissionDenied'
import NotFound from './NotFound'
import redirect from './utils/redirect'

export default [
  SignIn,
  SignUp,
  Question,
  Code,
  Submission,
  Exam,
  DashBoard,
  PermissionDenied,
  NotFound,
  redirect('/page-not-found')
]
