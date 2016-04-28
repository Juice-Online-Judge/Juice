import React from 'react';
import { Route, Redirect } from 'react-router';

import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import QuestionListView from 'views/QuestionListView/QuestionListView';
import NotFoundView from 'views/NotFoundView/NotFoundView';
import PermissionDeniedView from 'views/PermissionDeniedView/PermissionDeniedView';
import SignInView from 'views/SignInView/SignInView';
import SignUpView from 'views/SignUpView/SignUpView';
import QuestionView from 'views/QuestionView/QuestionView';
import QuestionNewView from 'views/QuestionNewView/QuestionNewView';
import SubmissionView from 'views/SubmissionView/SubmissionView';
import ExamListView from 'views/ExamListView/ExamListView';
import ExamNewView from 'views/ExamNewView/ExamNewView';
import ExamDetailView from 'views/ExamDetailView/ExamDetailView';
import ExamQuestionDetail from 'views/ExamDetailView/ExamQuestionDetail';
import ExamSubmissionDetail from 'views/ExamDetailView/ExamSubmissionDetail';
import ExamQuestionView from 'views/ExamQuestionView/ExamQuestionView';
import CodeView from 'views/CodeView/CodeView';

export default (
  <Route path='/' component={ CoreLayout }>
    <Redirect from='/' to='exams' />
    <Route path='sign-in' component={ SignInView } />
    <Route path='sign-up' component={ SignUpView } />
    <Route path='questions' component={ QuestionListView } />
    <Route path='questions/new' component={ QuestionNewView } />
    <Route path='questions/:uuid' component={ QuestionView } />
    <Route path='submissions' component={ SubmissionView } />
    <Route path='submissions/:id/code' component={ CodeView } />
    <Route path='exams/new' component={ ExamNewView } />
    <Route path='exams' component={ ExamListView } />
    <Redirect from='exams/:id' to='exams/:id/questions' />
    <Route path='exams/:id' component={ ExamDetailView } >
      <Route path='questions' component={ ExamQuestionDetail } />
      <Route path='submissions' component={ ExamSubmissionDetail } />
    </Route>
    <Route path='exams/:examId/questions/:uuid' component={ ExamQuestionView } />
    <Route path='exams/:examId/submissions/:id/code' component={ CodeView } />
    <Route path='/page-not-found' component={ NotFoundView } />
    <Route path='/permission-denied' component={ PermissionDeniedView } />
    <Redirect from='*' to='/page-not-found' />
  </Route>
);
