import React, {PropTypes} from 'react'
import loadable from 'react-loadable'

const LoadingComponent = ({isLoading, pastDelay, error}) => {
  if (isLoading) {
    return pastDelay ? <div> Loading... </div> : null
  } else if (error) {
    return <div> Fail to load compoent </div>
  } else {
    return null
  }
}

LoadingComponent.propTypes = {
  isLoading: PropTypes.boolean,
  pastDelay: PropTypes.boolean,
  error: PropTypes.object
}

export default loader => loadable({
  loader,
  LoadingComponent
})
