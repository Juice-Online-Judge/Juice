import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import map from 'lodash/map'

import LoadingContainer from 'containers/LoadingContainer'
import DataTable from 'components/DataTable'

import {fetchUsers} from 'redux/modules/users'

const columns = [
  {
    property: 'username',
    title: 'Username'
  },
  {
    property: 'nickname',
    title: 'Nickname'
  }
]

class UserTab extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  handleUserSelect = selectedRow => {
    setImmediate(() => this.emitChange(selectedRow))
  };

  emitChange(selectedRow) {
    this.props.onChange(selectedRow)
  }

  render() {
    const {users} = this.props
    return (
      <LoadingContainer>
        <DataTable
          data={ map(
            users
              .getIn(['entities', 'user'], {
                toJS() {
                  return {}
                }
              })
              .toJS()
          ) }
          search='username'
          multiSelectable
          paginated
          onSelectedChange={ this.handleUserSelect }
          columns={ columns } />
      </LoadingContainer>
    )
  }

  state = {
    selectedRow: []
  };

  static propTypes = {
    users: PropTypes.object.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  };
}

export default connect(state => ({users: state.users}), {fetchUsers})(UserTab)
