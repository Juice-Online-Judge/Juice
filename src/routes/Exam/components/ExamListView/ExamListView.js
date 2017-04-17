import React, {Component} from 'react'

import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import ExamList from './ExamList'

import styles from 'lib/styles'

class ExamListView extends Component {
  componentDidMount() {
    const {query} = this.props
    this.fetchExams(query, {force: true})
  }

  componentWillReceiveProps(newProps) {
    const {query} = newProps
    if (query.page !== this.props.query.page) {
      this.fetchExams(query)
    }
  }

  fetchExams(query, opts) {
    const page = parseInt(query.page) || 1
    this.props.fetchExams({page}, opts)
  }

  render() {
    const {exam, maxPage, admin} = this.props
    return (
      <div>
        <ExamList exam={ exam } maxPage={ maxPage } />
        {admin
          ? <Link to='/exams/new'>
            <FloatingActionButton style={ styles.floatBtn }>
              <AddIcon />
            </FloatingActionButton>
          </Link>
          : null}
      </div>
    )
  }

  static propTypes = {
    maxPage: PropTypes.number.isRequired,
    query: PropTypes.object.isRequired,
    exam: PropTypes.object.isRequired,
    admin: PropTypes.bool.isRequired,
    fetchExams: PropTypes.func.isRequired
  }
}

export default ExamListView
