import React from 'react'
import {Redirect} from 'react-router'

function redirect(to) {
  return () => <Redirect to={ to } />
}

export default redirect
