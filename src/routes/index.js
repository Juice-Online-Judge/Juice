import React from 'react'
import {Route, Switch} from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import GuestRoute from './components/GuestRoute'
import AdminRoute from './components/AdminRoute'
import ExistRoute from './components/ExistRoute'

import redirect from './utils/redirect'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import AboutUs from './AboutUs'
import Code from './Code'
import Exam from './Exam'
import ExamNew from './ExamNew'
import ExamDetail from './ExamDetail'
import NotFound from './NotFound'
import PermissionDenied from './PermissionDenied'
import Question from './Question'
import QuestionNew from './QuestionNew'
import QuestionDetail from './QuestionDetail'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Submission from './Submission'

export default () => (
  <CoreLayout>
    <Switch>
      <Route exact path='/' component={redirect('/exams')} />
      <Route path='/about-us' component={AboutUs} />
      <ExistRoute
        path='(exams/:examId/)submissions/:id/code'
        component={Code} />
      <AuthRoute exact path='/exams' component={Exam} />
      <AdminRoute path='/exams/new' component={ExamNew} />
      <ExistRoute
        path='/exams/:examId/questions/:uuid'
        component={QuestionDetail} />
      <ExistRoute path='/exams/:examId/:func?' component={ExamDetail} />
      <Route path='/page-not-found' component={NotFound} />
      <Route path='/permission-denied' component={PermissionDenied} />
      <Route exact path='/questions' component={Question} />
      <AdminRoute path='/questions/new' component={QuestionNew} />
      <ExistRoute path='/questions/:uuid' component={QuestionDetail} />
      <GuestRoute path='/sign-in' component={SignIn} />
      <GuestRoute path='/sign-up' component={SignUp} />
      <AuthRoute path='/submissions' component={Submission} />
      <Route component={redirect('/page-not-found')} />
    </Switch>
  </CoreLayout>
)
