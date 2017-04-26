import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import GuardRoute from '../GuardRoute'
import {isNotAdminSelector} from 'redux/modules/account'

function AdminRoute ({isNotAdmin, ...rest}) {
  return (
    <GuardRoute
      condition={() => isNotAdmin}
      redirectPath='/permission-denied'
      {...rest} />
  )
}

AdminRoute.propTypes = {
  isNotAdmin: PropTypes.bool.isRequired
}

export default connect(state => ({isNotAdmin: isNotAdminSelector(state)}))(
  AdminRoute
)
