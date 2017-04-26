import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import GuardRoute from '../GuardRoute'
import {errorCodeSelector} from 'redux/modules/app'

function ExistRoute ({errorCode}) {
  return <GuardRoute condition={() => errorCode === 404} />
}

ExistRoute.propTypes = {
  errorCode: PropTypes.number
}

export default connect(state => ({errorCode: errorCodeSelector(state)}))(
  ExistRoute
)
