import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Inset from 'layouts/Inset'
import LoadingContainer from 'containers/LoadingContainer'
import SubmissionList from 'components/SubmissionList'

import {fetchSubmissions} from 'redux/modules/submission'

export class SubmissionView extends Component {
  componentDidMount () {
    this.props.fetchSubmissions({force: true})
  }

  render () {
    const {submission} = this.props
    return (
      <Inset>
        <LoadingContainer>
          <SubmissionList submission={submission} />
        </LoadingContainer>
      </Inset>
    )
  }

  static propTypes = {
    submission: PropTypes.object.isRequired,
    fetchSubmissions: PropTypes.func.isRequired
  }
}

export default connect(state => ({submission: state.submission}), {
  fetchSubmissions
})(SubmissionView)
