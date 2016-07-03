import { connect } from 'react-redux'
import compose from 'recompose/compose'

import redirectNotAuth from 'lib/redirectNotAuth'
import { fetchExams } from 'redux/modules/exam'
import { createIsAdminSelector } from 'redux/modules/account'
import createMaxPageSelector from 'redux/selectors/maxPageSelector'

import ExamListView from '../components/ExamListView'

const maxPageSelector = createMaxPageSelector()
const isAdminSelector = createIsAdminSelector()

export default compose(
  redirectNotAuth,
  connect((state, props) => ({
    exam: state.exam,
    maxPage: maxPageSelector(state.exam),
    admin: isAdminSelector(state),
    query: props.location.query
  }), { fetchExams })
)(ExamListView)
