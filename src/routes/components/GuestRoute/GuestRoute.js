import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import GuardRoute from '../GuardRoute'
import {isLoginSelector} from 'redux/modules/account'

function GuestRoute ({isLogin, ...rest}) {
  return <GuardRoute condition={() => isLogin} redirectPath='/' {...rest} />
}

GuestRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired
}

export default connect(state => ({isLogin: isLoginSelector(state)}))(GuestRoute)
