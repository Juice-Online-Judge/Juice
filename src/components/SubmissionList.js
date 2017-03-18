import React, { PropTypes } from 'react'
import setPropTypes from 'recompose/setPropTypes'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'
import { isNeedReviewScore } from 'redux/modules/submission'

import Submission from './Submission'

const SubmissionList = compose(
  setDisplayName('SubmissionList'),
  setPropTypes({
    submission: PropTypes.object.isRequired,
    addFilter: PropTypes.func,
    examId: PropTypes.string
  })
)(({ submission, examId, addFilter }) => {
  const entities = submission.getIn(['entities', 'submission'])
  return (
    <div>
      {submission.get('result').map(idNum => {
        const id = `${idNum}`
        return (
          <Submission
            addFilter={ addFilter }
            key={ entities.getIn([id, 'id']) }
            id={ entities.getIn([id, 'id']) }
            needReview={ isNeedReviewScore(
              entities.getIn([id, 'judge', 'score'])
            ) }
            examId={ examId }
            userId={ entities.getIn([id, 'user', 'id']) }
            username={ entities.getIn([id, 'user', 'username']) }
            quesUuid={ entities.getIn([id, 'question', 'uuid']) }
            title={ entities.getIn([id, 'question', 'title']) }
            language={ entities.getIn([id, 'language']) }
            result={ entities.getIn([id, 'judge', 'result']) }
            time={ entities.getIn([id, 'judge', 'time']) }
            memory={ entities.getIn([id, 'judge', 'memory']) } />
        )
      })}
    </div>
  )
})

export default SubmissionList
