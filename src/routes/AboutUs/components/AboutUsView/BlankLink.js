import React, { PropTypes } from 'react'
import { setDisplayName, setPropTypes, compose } from 'recompose'

const BlankLink = compose(
  setDisplayName('BlankLink'),
  setPropTypes({
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  })
)(({ href, children }) => (
  <a href={ href } target='_blank' rel='noopener noreferrer'>
    { children }
  </a>
))

export default BlankLink
