import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { Table, TableHeader, TableRow, TableBody, TableRowColumn, TableHeaderColumn }
  from 'material-ui/Table';

import { actions as userActions } from 'redux/modules/users';

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
    const { page } = this.state;
    const baseIdx = (page - 1) * 6;
    const result = selectedRow.map((idx) => users.getIn(['result', idx + baseIdx]));
    this.props.onChange(result);
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <Table
          height='400px'
          fixedHeader
          selectable
          multiSelectable
          onRowSelection={ this.handleUserSelect } >
          <TableHeader enableSelectAll={ false } >
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
                <TableRow key={ id } >
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
      </div>
    );
  }

  state = {
    page: 1
  };

  static propTypes = {
    users: PropTypes.object.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ users: state.users }), userActions)(UserTab);
