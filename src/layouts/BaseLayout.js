import React from 'react'
import setDisplayName from 'recompose/setDisplayName'

const BaseLayout = setDisplayName('BaseLayout')(({ children }) => (
  <div> { children } </div>
))

export default BaseLayout
