import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Label from 'components/Label';

export class BasicInfoTab extends Component {
  @autobind
  handleNameChange(event) {
    this.handleChange({ name: event.target.value });
  }

  handleChange(data = {}) {
    // Fire change event
    this.props.onChange({ ...this.state, ...data });
    this.setState(data);
  }

  render() {
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
      </div>
    );
  }

  state = {
    name: null
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };
}

export default BasicInfoTab;
