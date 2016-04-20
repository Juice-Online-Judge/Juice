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
    setImmediate(() => this.emitChange(selectedRow));
  }

  emitChange(selectedRow) {
    const { users } = this.props;
    const result = selectedRow.map((idx) => users.getIn(['result', idx]));
    this.props.onChange(result);
  }

  render() {
    const { users } = this.props;
    const { selectedRow } = this.state;
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
              users.get('result').map((id, idx) => (
                <TableRow key={ id } rowNumber={ id } selected={ selectedRow.indexOf(idx) !== -1 } >
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
    selectedRow: []
  };

  static propTypes = {
    users: PropTypes.object.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ users: state.users }), userActions)(UserTab);
