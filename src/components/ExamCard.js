import React from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

import TitleCard from './TitleCard'
import styles from 'lib/styles'

const ExamCard = compose(
  setPropTypes({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    beganTime: PropTypes.string.isRequired,
    endedTime: PropTypes.string.isRequired
  }),
  setDisplayName('ExamCard')
)(({id, name, beganTime, endedTime}) =>
  <Link to={`/exams/${id}`} style={styles.noUnderline}>
    <TitleCard title={name} subtitle={`${beganTime} ~ ${endedTime}`} />
  </Link>
)

export default ExamCard
