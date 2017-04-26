import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

function GuardRoute ({condition, redirectPath, ...rest}) {
  if (condition()) {
    return <Redirect to={redirectPath} />
  }

  return <Route {...rest} />
}

GuardRoute.propTypes = {
  condition: PropTypes.func.isRequired,
  redirectPath: PropTypes.string.isRequired
}

export default GuardRoute
