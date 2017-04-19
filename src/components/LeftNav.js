import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Link } from 'react-router-dom'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

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
    <Switch>
      <Route
        path='/exams/:id'
        render={ ({ match: { params: { id } } }) => (
          <div>
            <Link to={ `/exams/${id}/questions` } style={ styles.noUnderline }>
              <MenuItem onTouchTap={ props.onRequestChange }>
                Question
              </MenuItem>
            </Link>
            <Link to={ `/exams/${id}/submissions` } style={ styles.noUnderline }>
              <MenuItem onTouchTap={ props.onRequestChange }>
                Submission
              </MenuItem>
            </Link>
          </div>
        ) } />
      <Route
        render={ () => (
          <div>
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
          </div>
        ) } />
    </Switch>
  </Drawer>
))

export default LeftNav
