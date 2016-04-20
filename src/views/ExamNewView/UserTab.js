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
  handleUserSelect(selectedRow) {
    this.setState({ selectedRow });
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
          <TableBody>
            {
              users.get('result').map((id) => (
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

  static propTypes = {
    users: PropTypes.object.isRequired,
    fetchUsers: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ users: state.users }), userActions)(UserTab);
