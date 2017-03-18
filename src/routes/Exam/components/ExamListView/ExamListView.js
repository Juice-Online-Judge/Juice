import React, { Component, PropTypes } from 'react'

import { Link } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import Inset from 'layouts/Inset'
import ExamCard from 'components/ExamCard'
import Pagination from 'components/Pagination'

import styles from 'lib/styles'

class ExamListView extends Component {
  componentDidMount() {
    const { query } = this.props
    this.fetchExams(query, { force: true })
  }

  componentWillReceiveProps(newProps) {
    const { query } = newProps
    if (query.page !== this.props.query.page) {
      this.fetchExams(query)
    }
  }

  fetchExams(query, opts) {
    const page = parseInt(query.page) || 1
    this.props.fetchExams({ page }, opts)
  }

  render() {
    const { exam, maxPage, admin } = this.props
    const examData = exam.getIn(['entities', 'exam'])
    return (
      <div>
        <Inset>
          {exam.get('result').map(id => {
            return (
              <ExamCard
                id={ id }
                key={ id }
                name={ examData.getIn([`${id}`, 'name']) }
                beganTime={ examData.getIn([`${id}`, 'began_at']) }
                endedTime={ examData.getIn([`${id}`, 'ended_at']) } />
            )
          })}
        </Inset>
        <Pagination
          baseUrl='/exams'
          current={ exam.get('page') }
          maxPage={ maxPage } />
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
  };
}

export default ExamListView
