import React from 'react'
import {setDisplayName} from 'recompose'
import {Link} from 'react-router-dom'

export const NotFoundView = setDisplayName('NotFoundView')(() =>
  <div>
    <h1>404 Not found</h1>
    <hr />
    <Link to='/'>Back To Index</Link>
  </div>
)

export default NotFoundView
