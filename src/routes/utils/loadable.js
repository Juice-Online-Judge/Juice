import React from 'react'
import PropTypes from 'prop-types'
import loadable from 'react-loadable'

const loading = ({isLoading, pastDelay, error}) => {
  if (isLoading) {
    return pastDelay ? <div> Loading... </div> : null
  } else if (error) {
    return <div> Fail to load compoent </div>
  } else {
    return null
  }
}

loading.propTypes = {
  isLoading: PropTypes.boolean,
  pastDelay: PropTypes.boolean,
  error: PropTypes.object
}

export default loader =>
  loadable({
    loader,
    loading
  })
