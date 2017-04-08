import React from 'react'
import PropTypes from 'prop-types'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

import {Link} from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import styles from 'lib/styles'

const LeftNav = compose(
  setDisplayName('LeftNav'),
  setPropTypes({
    onRequestChange: PropTypes.func.isRequired
  })
)(props => (
  <Drawer { ...props } docked={ false }>
    <Link to='/exams' style={ styles.noUnderline }>
      <MenuItem onTouchTap={ props.onRequestChange }>
        Exams
      </MenuItem>
    </Link>
    <Link to='/questions' style={ styles.noUnderline }>
      <MenuItem onTouchTap={ props.onRequestChange }>
        Question
      </MenuItem>
    </Link>
    <Link to='/submissions' style={ styles.noUnderline }>
      <MenuItem onTouchTap={ props.onRequestChange }>
        Submission
      </MenuItem>
    </Link>
  </Drawer>
))

export default LeftNav
