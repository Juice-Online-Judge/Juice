import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { Table, TableHeader, TableRow, TableBody, TableRowColumn, TableHeaderColumn }
  from 'material-ui/Table';
import Label from 'components/Label';
import { fetchRole } from 'redux/modules/role';

export class BasicInfoTab extends Component {
  componentDidMount() {
    this.props.fetchRole();
  }

  @autobind
  handleNameChange(event) {
    this.handleChange({ name: event.target.value });
  }

  @autobind
  handleRoleSelect(selectedRow) {
    const { role } = this.props;
    const selectedRole = selectedRow.map((idx) => role.getIn(['result', idx]));
    setImmediate(() => this.handleChange({ role: selectedRole }));
  }

  handleChange(data = {}) {
    // Fire change event
    this.props.onChange({ ...this.state, ...data });
    this.setState(data);
  }

  render() {
    const { role } = this.props;

    return (
      <div>
        <div>
          <TextField
            floatingLabelText='Name'
            fullWidth
            onChange={ this.handleNameChange } />
        </div>
        <Row>
          <Col md={ 2 } xs={ 12 }>
            <Label>
              Begin time:
            </Label>
          </Col>
          <Col md={ 4 } xs={ 12 }>
            <DatePicker hintText='Begin Date' />
          </Col>
          <Col md={ 4 } xs={ 12 }>
            <TimePicker hintText='Begin Time' />
          </Col>
        </Row>
        <Row>
          <Col md={ 2 } xs={ 12 }>
            <Label>
              End time:
            </Label>
          </Col>
          <Col md={ 4 } xs={ 12 }>
            <DatePicker hintText='End Date' />
          </Col>
          <Col md={ 4 } xs={ 12 }>
            <TimePicker hintText='End Time' />
          </Col>
        </Row>
        <Table
          height='200px'
          fixedHeader
          selectable
          multiSelectable
          onRowSelection={ this.handleRoleSelect } >
          <TableHeader enableSelectAll={ false } >
            <TableRow>
              <TableHeaderColumn>
                Role
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={ false } >
            {
              role.get('result').map((id) => (
                <TableRow key={ id }>
                  <TableRowColumn>
                    { role.getIn(['entities', 'role', `${id}`, 'name']) }
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
    name: null
  };

  static propTypes = {
    role: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    fetchRole: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ role: state.role }), { fetchRole })(BasicInfoTab);
