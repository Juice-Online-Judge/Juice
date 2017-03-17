import React, {Component, PropTypes} from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Inset from 'layouts/Inset'
import {fetchExamToken} from 'redux/modules/exam'
import redirect from 'routes/utils/redirect'

import Questions from '../../routes/Questions'
import Submissions from '../../routes/Submissions'
import ExamDetailHeader from './ExamDetailHeader'
import SwitchButton from './SwitchButton'

class ExamDetailView extends Component {
  componentDidMount() {
    const {examId} = this.props
    this.props.fetchExamToken(examId)
  }

  get switchButton() {
    return (
      <Switch>
        <Route
          path={ `/exams/:examId/submissions` }
          render={ ({match: {params: {examId}}}) => (
            <SwitchButton examId={ examId } func='questions' />
          ) } />
        <Route
          path={ `/exams/:examId/questions` }
          render={ ({match: {params: {examId}}}) => (
            <SwitchButton examId={ examId } func='submissions' />
          ) } />
      </Switch>
    )
  }

  render() {
    const {exam, examId, func} = this.props
    const token = exam.getIn(['tokens', `${examId}`])

    return (
      <Inset>
        <ExamDetailHeader token={ token } isSubmission={ func === 'submissions' } />
        <Switch>
          <Route path='/exam/:examId/questions' component={ Questions } />
          <Route path='/exam/:examId/submissions' component={ Submissions } />
          <Route
            path='/exam/:examId/:func'
            component={ redirect(`/exam/${examId}/questions`) } />
        </Switch>
        {this.switchButton}
      </Inset>
    )
  }

  static propTypes = {
    exam: PropTypes.object.isRequired,
    func: PropTypes.string.isRequired,
    examId: PropTypes.string.isRequired,
    fetchExamToken: PropTypes.func.isRequired
  };
}

export default connect(
  ({exam}, {match: {params: {examId, func}}}) => ({
    exam,
    examId,
    func
  }),
  {fetchExamToken}
)(ExamDetailView)
