import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import range from 'lodash/range';

import { Table, TableHeader, TableRow, TableBody, TableRowColumn, TableHeaderColumn }
  from 'material-ui/Table';
import LoadingContainer from 'containers/LoadingContainer';

import { fetchUsers } from 'redux/modules/users';

class UserTab extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  @autobind
  handlePageChange(page) {
    this.setState({ page });
  }

  @autobind
  handleUserSelect(selectedRow) {
    setImmediate(() => this.emitChange(selectedRow));
  }

  emitChange(selectedRow) {
    const { users } = this.props;
    if (selectedRow === 'all') {
      selectedRow = range(0, users.get('result').size);
    }
    const result = selectedRow.map((idx) => users.getIn(['result', idx]));
    this.setState({ selectedRow });
    this.props.onChange(result);
  }

  render() {
    const { users } = this.props;
    const { selectedRow } = this.state;
    return (
      <LoadingContainer>
        <Table
          height='400px'
          fixedHeader
          selectable
          multiSelectable
          onRowSelection={ this.handleUserSelect } >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>
                Username
              </TableHeaderColumn>
              <TableHeaderColumn>
                Nickname
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={ false } >
            {
              users.get('result').map((id, idx) => (
                <TableRow selected={ selectedRow.indexOf(idx) !== -1 } key={ id } >
                  <TableRowColumn>
                    { users.getIn(['entities', 'user', `${id}`, 'username']) }
                  </TableRowColumn>
                  <TableRowColumn>
                    { users.getIn(['entities', 'user', `${id}`, 'nickname']) }
                  </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </LoadingContainer>
    );
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

export default connect((state) => ({ users: state.users }), { fetchUsers })(UserTab);
