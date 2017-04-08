import React, {PropTypes} from 'react'
import {setDisplayName, setPropTypes, compose} from 'recompose'
import LastUpdateDisplay from './LastUpdateDisplay'
import BlankLink from './BlankLink'

const ProjectDisplay = compose(
  setDisplayName('ProjectDisplay'),
  setPropTypes({
    project: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
  })
)(({desc, project}) => (
  <div>
    {desc}:
    <BlankLink href={ `https://github.com/Sunday-Without-God/${project}` }>
      {`https://github.com/Sunday-Without-God/${project}`}
    </BlankLink>
    <LastUpdateDisplay project={ project } />
  </div>
))

export default ProjectDisplay
