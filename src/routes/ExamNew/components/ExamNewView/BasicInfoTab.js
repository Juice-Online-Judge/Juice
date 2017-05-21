import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import isAfter from 'date-fns/is_after'
import setSeconds from 'date-fns/set_seconds'

import {Row, Col} from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableRowColumn,
  TableHeaderColumn
} from 'material-ui/Table'
import Label from 'components/Label'
import {fetchRole} from 'redux/modules/role'

const now = new Date()
const copyDate = (origDate, date) => {
  const newDate = new Date(origDate)
  newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
  return newDate
}

export class BasicInfoTab extends Component {
  componentDidMount () {
    this.props.fetchRole()
  }

  handleNameChange = event => {
    this.handleChange({name: event.target.value})
  }

  handleRoleSelect = selectedRow => {
    const {role} = this.props
    const selectedRole = selectedRow.map(idx => role.getIn(['result', idx]))
    setImmediate(() => this.props.onChange({...this.state, role: selectedRole}))
  }

  handleBeganDateChange = (_event, date) => {
    const newDate = copyDate(this.state.beganTime, date)
    this.handleChange({beganTime: newDate})
    this.checkTime(date, this.state.endedTime)
  }

  handleBeganTimeChange = (_event, date) => {
    this.handleChange({beganTime: date})
    this.checkTime(date, this.state.endedTime)
  }

  handleEndedDateChange = (_event, date) => {
    const newDate = copyDate(this.state.endedTime, date)
    this.handleChange({endedTime: newDate})
    this.checkTime(this.state.beganTime, date)
  }

  handleEndedTimeChange = (_event, date) => {
    this.handleChange({endedTime: date})
    this.checkTime(this.state.beganTime, date)
  }

  handleChange (data = {}) {
    // Fire change event
    this.props.onChange({...this.state, ...data})
    this.setState(data)
  }

  checkTime (begin, end) {
    if (isAfter(end, begin)) {
      this.setState(() => ({
        errorText: ''
      }))
      return
    }
    this.setState(() => ({
      errorText: 'Ended time must after began time'
    }))
  }

  render () {
    const {role} = this.props

    return (
      <div>
        <div>
          <TextField
            floatingLabelText='測驗名稱'
            fullWidth
            onChange={this.handleNameChange} />
        </div>
        <Row>
          <Col md={2} xs={12}>
            <Label htmlFor='begin-date'>
              Begin time:
            </Label>
          </Col>
          <Col md={4} xs={12}>
            <DatePicker
              name='begin-date'
              hintText='Begin Date'
              defaultDate={now}
              onChange={this.handleBeganDateChange} />
          </Col>
          <Col md={4} xs={12}>
            <TimePicker
              hintText='Begin Time'
              onChange={this.handleBeganTimeChange}
              value={this.state.beganTime} />
          </Col>
        </Row>
        <Row>
          <Col md={2} xs={12}>
            <Label htmlFor='end-date'>
              End time:
            </Label>
          </Col>
          <Col md={4} xs={12}>
            <DatePicker
              name='end-date'
              hintText='End Date'
              errorText={this.state.errorText}
              defaultDate={now}
              onChange={this.handleEndedDateChange} />
          </Col>
          <Col md={4} xs={12}>
            <TimePicker
              hintText='End Time'
              errorText={this.state.errorText}
              onChange={this.handleEndedTimeChange}
              value={this.state.endedTime} />
          </Col>
        </Row>
        <Table
          height='200px'
          fixedHeader
          selectable
          onRowSelection={this.handleRoleSelect}>
          <TableHeader enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn>
                管理群組 (目前無法使用)
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {role.get('result').map(id => (
              <TableRow key={id}>
                <TableRowColumn>
                  {role.getIn(['entities', 'role', `${id}`, 'name'])}
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  state = {
    name: '',
    errorText: '',
    beganTime: setSeconds(new Date(), 0),
    endedTime: setSeconds(new Date(), 0)
  }

  static propTypes = {
    role: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    fetchRole: PropTypes.func.isRequired
  }
}

export default connect(state => ({role: state.role}), {fetchRole})(BasicInfoTab)
