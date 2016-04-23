import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import QuestionListView from 'views/QuestionListView/QuestionListView';
import NotFoundView from 'views/NotFoundView/NotFoundView';
import SignInView from 'views/SignInView/SignInView';
import SignUpView from 'views/SignUpView/SignUpView';
import QuestionView from 'views/QuestionView/QuestionView';
import QuestionNewView from 'views/QuestionNewView/QuestionNewView';
import SubmissionView from 'views/SubmissionView/SubmissionView';
import ExamListView from 'views/ExamListView/ExamListView';
import ExamNewView from 'views/ExamNewView/ExamNewView';
import ExamQuestionListView from 'views/ExamQuestionListView/ExamQuestionListView';
import ExamQuestionView from 'views/ExamQuestionView/ExamQuestionView';
import CodeView from 'views/CodeView/CodeView';

export default (
  <Route path='/' component={ CoreLayout }>
    <IndexRoute component={ QuestionListView } />
    <Route path='sign-in' component={ SignInView } />
    <Route path='sign-up' component={ SignUpView } />
    <Route path='questions/new' component={ QuestionNewView } />
    <Route path='questions/:uuid' component={ QuestionView } />
    <Route path='submission' component={ SubmissionView } />
    <Route path='submission/:id/code' component={ CodeView } />
    <Route path='exams/new' component={ ExamNewView } />
    <Route path='exams' component={ ExamListView } />
    <Route path='exams/:id' component={ ExamQuestionListView } />
    <Route path='exams/:examId/questions/:uuid' component={ ExamQuestionView } />
    <Route path='/page-not-found' component={ NotFoundView } />
    <Redirect from='*' to='/page-not-found' />
  </Route>
);
