import React from 'react'
import { setDisplayName } from 'recompose'
import { Link } from 'react-router'

export const PermissionDeniedView = setDisplayName('PermissionDeniedView')(
  () => (
    <div>
      <h1>403 Permission denied</h1>
      <hr />
      <Link to='/'>Back To Index</Link>
    </div>
  )
)

export default PermissionDeniedView
