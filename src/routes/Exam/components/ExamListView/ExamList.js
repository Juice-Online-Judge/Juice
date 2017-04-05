import React from 'react'
import branch from 'recompose/branch'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import renderComponent from 'recompose/renderComponent'
import Inset from 'layouts/Inset'
import ExamCard from 'components/ExamCard'
import Pagination from 'components/Pagination'

const examKey = ['entities', 'exam']
const emptyHint = () => (
  <Inset>
    無測驗可顯示
  </Inset>
)

export default compose(
  withProps(({exam}) => ({empty: exam.get('result').isEmpty()})),
  branch(
    ({empty}) => empty,
    renderComponent(emptyHint)
  )
)(({exam, maxPage}) => {
  const examData = exam.getIn(examKey)
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
    </div>
  )
})
