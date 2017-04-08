import React from 'react'
import PropTypes from 'prop-types'
import setPropTypes from 'recompose/setPropTypes'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'
import times from 'lodash/times'
import defaultTo from 'lodash/defaultTo'

const emptyArray = []

const LineNumbers = compose(
  setPropTypes({
    code: PropTypes.string.isRequired
  }),
  setDisplayName('LineNumbers')
)(({code}) => {
  const lines = defaultTo(code.match(/\n(?!$)/g), emptyArray).length + 1
  return (
    <span aria-hidden='true' className='line-numbers-rows'>
      {times(lines, idx => <span key={ idx } />)}
    </span>
  )
})

export default LineNumbers
