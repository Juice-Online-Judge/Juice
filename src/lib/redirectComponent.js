import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import setDisplayName from 'recompose/setDisplayName'
import wrapDisplayName from 'recompose/wrapDisplayName'
import compose from 'recompose/compose'
import branch from 'recompose/branch'
import renderComponent from 'recompose/renderComponent'
import omitPropsHOC from './omitProps'

const redirectComponent = ({
  name,
  mapStateToProp,
  shouldRedirect,
  redirectPath,
  cleanUp,
  actions,
  omitProps = []
}) => WrappedComponent => {
  const redirect = <Redirect to={redirectPath} />
  const redirectComponentHOC = props => {
    if (cleanUp) {
      cleanUp(props)
    }
    return redirect
  }

  return compose(
    connect(mapStateToProp, actions),
    setDisplayName(wrapDisplayName(WrappedComponent, name)),
    branch(shouldRedirect, renderComponent(redirectComponentHOC)),
    omitPropsHOC(omitProps)
  )(WrappedComponent)
}

export default redirectComponent
