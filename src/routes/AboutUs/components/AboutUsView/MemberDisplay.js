import React, {PropTypes} from 'react'
import {setDisplayName, setPropTypes, compose} from 'recompose'
import BlankLink from './BlankLink'

const MemberDisplay = compose(
  setDisplayName('MemberDisplay'),
  setPropTypes({
    name: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
  })
)(({name, github, desc}) => (
  <p>
    <BlankLink href={ `https://github.com/${github}` }> {name} </BlankLink>:
    {desc}
  </p>
))

export default MemberDisplay
