import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from 'react-flexbox-grid'
import setPropTypes from 'recompose/setPropTypes'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'

import RefreshIndicator from 'material-ui/RefreshIndicator'

export const CenterLoading = compose(
  setDisplayName('CenterLoading'),
  setPropTypes({
    left: PropTypes.number.isRequired,
    loading: PropTypes.bool
  })
)(({left, loading}) => {
  const status = loading ? 'loading' : 'hide'
  return (
    <Row center='xs'>
      <Col>
        <RefreshIndicator status={status} left={left} top={10} />
      </Col>
    </Row>
  )
})

export default CenterLoading
